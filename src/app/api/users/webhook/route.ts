import { users } from "@/db/schema";
import { db } from "@/index";
import { WebhookEvent } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  // Clerk 대시보드에서 제공되는 서명 비밀 키를 환경 변수에서 가져옴
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add CLERK_SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Svix 인스턴스를 생성하여 서명 비밀 키를 설정
  const wh = new Webhook(SIGNING_SECRET);

  // 요청 헤더를 가져옴
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Svix 관련 헤더가 없으면 에러 반환
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // 요청 본문을 JSON으로 파싱
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Svix를 사용하여 요청 본문과 헤더를 검증
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // 이벤트 타입을 가져옴
  const eventType = evt.type;

  // 이벤트 타입이 "user.created"인 경우 사용자 데이터를 데이터베이스에 삽입
  if (eventType === "user.created") {
    const { data } = evt;

    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    });
  }

  // 이벤트 타입이 "user.deleted"인 경우 사용자 데이터를 데이터베이스에서 삭제
  if (eventType === "user.deleted") {
    const { data } = evt;

    if (!data.id) {
      return new Response("Missing user id", { status: 400 });
    }

    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  // 이벤트 타입이 "user.updated"인 경우 사용자 데이터를 데이터베이스에서 업데이트
  if (eventType === "user.updated") {
    const { data } = evt;

    await db
      .update(users)
      .set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      })
      .where(eq(users.clerkId, data.id));
  }

  // 성공적으로 웹훅을 처리했음을 응답
  return new Response("Webhook received", { status: 200 });
}
