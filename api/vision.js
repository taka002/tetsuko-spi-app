export default async function handler(req, res) {
  try {
    const { image, question } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: question },
              {
                type: "input_image",
                image_url: image
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.output[0].content[0].text
    });

  } catch (e) {
    res.status(500).json({ reply:"画像解析エラー" });
  }
}
