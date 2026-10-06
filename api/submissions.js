export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const { name, email, phone, whatsapp, city, instagram } = request.body ?? {};
  const requiredValues = { name, email, phone, whatsapp, city };
  const hasInvalidRequiredField = Object.values(requiredValues).some(
    (value) => typeof value !== "string" || !value.trim(),
  );

  if (hasInvalidRequiredField) {
    return response.status(400).json({
      error: "Please provide your name, email, phone, WhatsApp number, and city.",
    });
  }

  if (
    name.trim().length > 120 ||
    email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    phone.trim().length > 32 ||
    whatsapp.trim().length > 32 ||
    city.trim().length > 100 ||
    (instagram !== undefined &&
      (typeof instagram !== "string" || instagram.trim().length > 40))
  ) {
    return response.status(400).json({
      error: "Please check your email address and field lengths.",
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "");
  const supabaseKey =
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim();

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase submission storage is not configured.");
    return response.status(500).json({
      error: "We couldn't save your details. Please try again later.",
    });
  }

  try {
    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/submissions`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        whatsapp: whatsapp.trim(),
        city: city.trim(),
        instagram: typeof instagram === "string" ? instagram.trim() || null : null,
      }),
    });

    if (!supabaseResponse.ok) {
      console.error("Supabase rejected a form submission:", {
        status: supabaseResponse.status,
      });
      return response.status(500).json({
        error: "We couldn't save your details. Please try again later.",
      });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to save beauty care submission to Supabase:", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return response.status(500).json({
      error: "We couldn't save your details. Please try again later.",
    });
  }
}
