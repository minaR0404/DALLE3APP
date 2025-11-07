import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    setImageUrl("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/generate_image", { prompt }); //http://localhost:8000/generate_image
      setImageUrl(res.data.url);
    } catch (err) {
      alert("画像生成に失敗しました");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-10 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold">🎨 DALL·E 3 画像生成アプリ</h1>
      <textarea
        className="border p-3 w-96 rounded-lg"
        rows={3}
        placeholder="生成したい画像を説明してください（例: 富士山の上を飛ぶドラゴン）"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
        onClick={generateImage}
        disabled={loading}
      >
        {loading ? "生成中..." : "画像を生成"}
      </button>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated"
          className="mt-6 rounded-lg shadow-lg w-96"
        />
      )}
    </div>
  );
}

export default App;
