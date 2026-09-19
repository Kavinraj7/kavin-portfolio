import { NextResponse } from 'next/server';

const KAVIN_BIO_KNOWLEDGE = {
  stack: "Kavin's core tech stack includes Next.js (App Router), TypeScript, Tailwind CSS for styling, Framer Motion and GSAP for fluid animations, Three.js & React Three Fiber for 3D visual experiences, Lenis for smooth scroll physics, Python FastAPI for AI/RAG microservices, and MySQL/PostgreSQL for relational databases.",
  experience: "Kavin has extensive technical, internship, and campaign experience. He has worked as a Lead Developer building Next.js 15 App Router applications, structured RAG vector search pipelines with FastAPI, and led developer campaign initiatives engaging over 1,000+ participants.",
  extracurricular: "Kavin served as Technical Club President, mentoring 150+ students in modern web development. He also won 1st place in the National AI & Web Hackathon for an autonomous RAG query system.",
  unique: "What makes Kavin unique is his hybrid expertise: combining pixel-perfect UI design & 60fps animations with deep backend AI engineering and proven campaign leadership.",
  contact: "You can reach Kavin via the 'Let's Connect' button on the navigation bar or through GitHub and LinkedIn.",
};

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Valid string message is required' }, { status: 400 });
    }

    const query = message.toLowerCase();

    // Check if external Python FastAPI server is specified in env
    const fastApiUrl = process.env.FASTAPI_AI_URL;
    if (fastApiUrl) {
      try {
        const fastApiResponse = await fetch(`${fastApiUrl}/api/rag-query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: message }),
        });

        if (fastApiResponse.ok) {
          const data = await fastApiResponse.json();
          return NextResponse.json({ reply: data.response || data.reply });
        }
      } catch (e) {
        console.warn('FastAPI server unreachable, falling back to local bio intelligence engine:', e);
      }
    }

    // Context-aware fallback response generation based on portfolio knowledge
    let reply = "";

    if (query.includes('stack') || query.includes('tech') || query.includes('framework') || query.includes('language')) {
      reply = KAVIN_BIO_KNOWLEDGE.stack;
    } else if (query.includes('experience') || query.includes('work') || query.includes('internship') || query.includes('campaign')) {
      reply = KAVIN_BIO_KNOWLEDGE.experience;
    } else if (query.includes('extra') || query.includes('club') || query.includes('hackathon') || query.includes('leadership')) {
      reply = KAVIN_BIO_KNOWLEDGE.extracurricular;
    } else if (query.includes('unique') || query.includes('why') || query.includes('special')) {
      reply = KAVIN_BIO_KNOWLEDGE.unique;
    } else if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('connect')) {
      reply = KAVIN_BIO_KNOWLEDGE.contact;
    } else {
      reply = `Thanks for asking! As Kavin's AI representative, I can share that Kavin is a Full-Stack & AI Engineer specializing in Next.js, TypeScript, Framer Motion, Three.js, and Python FastAPI RAG microservices. Feel free to explore the Projects or Skills section to see more!`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { reply: "Kavin's AI engine processed your request! Kavin specializes in Next.js, TypeScript, Three.js, and AI RAG applications." },
      { status: 200 }
    );
  }
}
