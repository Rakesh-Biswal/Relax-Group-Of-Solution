export async function POST(request) {
  try {
    const body = await request.json()
    console.log("[relax-contact]", body) // In production, send email or store in DB
    return Response.json({ ok: true })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 400 })
  }
}
