/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Star, 
  CheckCircle2, 
  Download, 
  Printer, 
  ShoppingCart, 
  Play, 
  Pause,
  Users, 
  Heart, 
  BookOpen, 
  ChevronDown, 
  ShieldCheck,
  Clock,
  Gamepad2,
  Puzzle,
  FileText,
  HelpCircle,
  Layers,
  Grid3X3,
  Dices
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Button = ({ children, className = "", variant = "gold", onClick }: { children: React.ReactNode, className?: string, variant?: "gold" | "blue", onClick?: () => void }) => {
  const baseStyles = "w-full md:w-auto px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2";
  const variants = {
    gold: "bg-brand-gold text-brand-dark hover:bg-yellow-400",
    blue: "bg-brand-medium text-white hover:bg-brand-dark"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const SectionTitle = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-12">
    <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${light ? 'text-white' : 'text-brand-dark'}`}>
      {children}
    </h2>
    {subtitle && <p className={`text-lg max-w-2xl mx-auto ${light ? 'text-blue-100' : 'text-slate-600'}`}>{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string, key?: React.Key }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-brand-dark text-lg">{question}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-brand-medium`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const VideoPlayer = ({ src, poster }: { src: string, poster: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative max-w-[320px] mx-auto aspect-[9/16] bg-black rounded-[2rem] shadow-2xl overflow-hidden group border-4 border-white/10">
      {/* Video Element */}
      <video 
        ref={videoRef}
        className="w-full h-full object-cover z-10 cursor-pointer"
        poster={poster}
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlay}
        referrerPolicy="no-referrer"
      >
        <source src={src} type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>

      {/* Custom Controls Overlay: Clean Play Button */}
      <div 
        className={`absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100 bg-black/10' : 'opacity-100 bg-black/30'}`}
        onClick={togglePlay}
      >
        {!isPlaying && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-20 h-20 bg-brand-gold/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
          >
            <Play size={32} fill="currentColor" className="text-brand-dark ml-1" />
          </motion.div>
        )}
        {isPlaying && (
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
          >
            <Pause size={32} fill="white" className="text-white" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

// --- Sections ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-brand-dark">
      {/* 1. HERO SECTION */}
      <header className="relative overflow-hidden bg-brand-light pt-10 pb-20 md:pt-20 md:pb-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
                <div className="flex text-brand-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm font-semibold text-brand-dark">+5.000 famílias satisfeitas</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-dark leading-tight mb-6">
                Transforme o aprendizado da Bíblia em um momento divertido com <span className="text-brand-gold">+20 atividades bíblicas prontas para imprimir</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Um kit completo para ajudar crianças a aprenderem sobre Deus de forma simples, educativa e divertida. <span className="text-brand-medium font-bold italic">Aprender a Bíblia brincando</span> nunca foi tão fácil!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <Button onClick={() => document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })}>
                  QUERO GARANTIR O KIT BÍBLICO
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1"><ShieldCheck size={18} className="text-green-500" /> Compra Segura</span>
                <span className="flex items-center gap-1"><Clock size={18} className="text-brand-medium" /> Acesso Imediato</span>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <img 
                  src="https://i.imgur.com/rx42gmu.png" 
                  alt="Kit Bíblico Infantil" 
                  className="rounded-3xl shadow-2xl border-8 border-white"
                  referrerPolicy="no-referrer"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-brand-dark text-white p-6 rounded-2xl shadow-xl hidden md:block">
                  <p className="text-3xl font-black text-brand-gold">100%</p>
                  <p className="text-sm font-bold uppercase tracking-wider">Digital</p>
                </div>
              </motion.div>
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-medium/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MINI VSL */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle="Descubra como o nosso material vai ajudar na educação cristã do seu filho.">
            Veja em menos de 1 minuto como funciona
          </SectionTitle>
          
          <div className="max-w-4xl mx-auto">
            <VideoPlayer 
              src="https://i.imgur.com/wDWnmUA.mp4" 
              poster="https://i.imgur.com/wDWnmUA.jpg" 
            />
            
            <div className="mt-10 text-center">
              <Button onClick={() => document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })}>
                QUERO MEU KIT AGORA
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEMA */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-6">
                Você sente dificuldade em ensinar a Bíblia para seus filhos?
              </h2>
              <ul className="space-y-4">
                {[
                  "Crianças distraídas com telas e jogos vazios",
                  "Falta de tempo para preparar materiais educativos",
                  "Dificuldade em explicar temas complexos de forma simples",
                  "Escassez de materiais cristãos de qualidade e divertidos"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <div className="mt-1 text-red-500"><CheckCircle2 size={20} /></div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2">
              <Card className="bg-white border-l-8 border-brand-medium">
                <p className="text-xl font-bold text-brand-dark mb-4">Nós entendemos você!</p>
                <p className="text-slate-600 leading-relaxed">
                  Muitos pais e educadores passam pelo mesmo desafio. Por isso, criamos uma solução que une o <strong>ensino da Palavra</strong> com o que as crianças mais amam: <strong>brincar!</strong>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOLUÇÃO */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle="O Kit Bíblico Infantil foi desenvolvido por especialistas para tornar o tempo em família inesquecível.">
            A Solução Perfeita para sua Família
          </SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <BookOpen />, title: "+20 Atividades", desc: "Material variado para todas as idades." },
              { icon: <Gamepad2 />, title: "Jogos Educativos", desc: "Aprenda brincando de verdade." },
              { icon: <Heart />, title: "Valores Cristãos", desc: "Base sólida para a vida toda." },
              { icon: <Download />, title: "Fácil de Usar", desc: "Baixe, imprima e comece hoje." }
            ].map((item, i) => (
              <Card key={i} className="text-center group hover:border-brand-medium">
                <div className="w-16 h-16 bg-brand-light text-brand-medium rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-medium group-hover:text-white transition-colors duration-300">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. O QUE VEM NO KIT */}
      <section className="py-20 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 bg-[#F9F1E2] text-[#8B6E32] rounded-full text-sm font-bold mb-6">
            O que você recebe
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#2D2D2D] mb-4">
            20 jogos organizados por categoria
          </h2>
          <p className="text-lg text-slate-500 mb-16">
            Prontos para imprimir e jogar com toda a família
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { 
                title: "Cartas e Cartelas", 
                icon: <Layers className="text-[#10B981]" />, 
                items: ["Super Trunfo — Livros da Bíblia", "UNO da Fé", "Mico da Fé"] 
              },
              { 
                title: "Jogos de Tabuleiro", 
                icon: <Grid3X3 className="text-[#10B981]" />, 
                items: ["Dominó Bíblico", "Bingo Bíblico", "Bingo de Jesus"] 
              },
              { 
                title: "Memória e Associação", 
                icon: <Dices className="text-[#10B981]" />, 
                items: ["Jogo da Memória Bíblica", "Encontre as Cenas", "3 Pistas"] 
              },
              { 
                title: "Quizzes e Desafios", 
                icon: <HelpCircle className="text-[#10B981]" />, 
                items: ["Quiz Bíblico", "Quem Sou Eu?", "Verdade ou Mentira"] 
              }
            ].map((cat, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-[#F5F1E9] text-left shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#ECFDF5] rounded-xl flex items-center justify-center mb-6">
                  {React.cloneElement(cat.icon as React.ReactElement, { size: 24 })}
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-6">{cat.title}</h3>
                <ul className="space-y-4">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BENEFÍCIOS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <img 
                src="/api/attachments/1741382860000/image.png" 
                alt="Crianças felizes aprendendo" 
                className="rounded-3xl shadow-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:w-1/2">
              <SectionTitle subtitle="Mais do que apenas papel, estamos construindo memórias eternas.">
                Benefícios para o seu filho
              </SectionTitle>
              <div className="space-y-6">
                {[
                  { title: "Fortalece a Fé", desc: "Conhecimento bíblico enraizado desde cedo." },
                  { title: "Estimula o Aprendizado", desc: "Desenvolve coordenação motora e raciocínio." },
                  { title: "Tempo de Qualidade", desc: "Momentos preciosos entre pais e filhos." },
                  { title: "Alternativa Saudável", desc: "Menos tempo de tela, mais tempo de valor." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-brand-dark">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMO FUNCIONA */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle="Simples, rápido e prático.">
            Como funciona?
          </SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Faça a compra", desc: "Pagamento 100% seguro via cartão, PIX ou boleto.", icon: <ShoppingCart /> },
              { step: "02", title: "Receba o material", desc: "Acesso imediato enviado para o seu e-mail.", icon: <Download /> },
              { step: "03", title: "Imprima e use", desc: "Imprima quantas vezes quiser e comece a diversão!", icon: <Printer /> }
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-brand-medium relative z-10">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-brand-medium/20 -translate-x-1/2 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PROVA SOCIAL */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle="Veja o que outros pais estão dizendo sobre o nosso material.">
            Famílias que amam o Kit
          </SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Mariana Silva", role: "Mãe do Pedro (6 anos)", text: "O material é incrível! Meu filho agora pede para fazer as atividades bíblicas em vez de jogar no celular. Recomendo muito!" },
              { name: "Ricardo Oliveira", role: "Pai da Ana (4 anos)", text: "Fácil de imprimir e as atividades são muito bem feitas. Tem ajudado muito no nosso culto doméstico." },
              { name: "Carla Santos", role: "Professora de EBD", text: "Uso na minha classe da igreja e as crianças amam. É lúdico, colorido e com conteúdo bíblico fiel." }
            ].map((item, i) => (
              <Card key={i} className="flex flex-col">
                <div className="flex text-brand-gold mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 italic mb-6 flex-grow">"{item.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-light rounded-full overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt={item.name} referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 9. OFERTA */}
      <section id="oferta" className="py-20 bg-brand-medium text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10 lg:p-16 text-brand-dark">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-brand-gold drop-shadow-sm">Oferta Especial de Lançamento</h2>
              <p className="text-slate-600 mb-8">Garanta agora o seu acesso vitalício ao Kit Bíblico Infantil com um desconto exclusivo.</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <CheckCircle2 size={20} /> +20 Atividades Prontas
                </div>
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <CheckCircle2 size={20} /> Acesso Vitalício
                </div>
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <CheckCircle2 size={20} /> Atualizações Gratuitas
                </div>
              </div>
              
              <motion.div 
                className="mb-8 p-6 bg-brand-light/50 rounded-2xl border border-brand-medium/10"
                animate={{ 
                  boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0)", "0 0 0 10px rgba(16, 185, 129, 0.1)", "0 0 0 0 rgba(16, 185, 129, 0)"],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-slate-400 line-through text-xl">De R$ 97,00</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-brand-dark text-lg font-bold">Por apenas</span>
                  <span className="text-5xl font-black text-brand-medium">R$ 17,00</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Pagamento único. Sem mensalidades.</p>
              </motion.div>
              
              <Button className="w-full" variant="gold">
                QUERO ACESSO IMEDIATO
              </Button>
            </div>
            
            <div className="md:w-1/2 bg-brand-light p-10 flex flex-col items-center justify-center text-center">
              <div className="relative mb-6">
                <img 
                  src="https://i.imgur.com/rx42gmu.png" 
                  alt="Mockup do Produto" 
                  className="w-64 h-64 object-cover rounded-2xl shadow-lg rotate-3"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -top-4 -right-4 bg-red-500 text-white font-black px-4 py-2 rounded-full shadow-lg -rotate-12">
                  82% OFF
                </div>
              </div>
              <p className="text-brand-dark font-bold text-lg mb-2">Acesso Imediato via E-mail</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. GARANTIA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <ShieldCheck size={80} className="mx-auto text-brand-gold mb-6" />
            <h2 className="text-3xl font-extrabold text-brand-dark mb-4">Garantia Incondicional de 7 Dias</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Fique tranquilo! Se por qualquer motivo você não gostar do material, basta nos enviar um e-mail em até 7 dias e devolveremos 100% do seu dinheiro. Sem perguntas, sem burocracia.
            </p>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle="Tire suas dúvidas sobre o Kit Bíblico Infantil.">
            Perguntas Frequentes
          </SectionTitle>
          
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-sm">
            <FAQItem 
              question="Como recebo o material?" 
              answer="O acesso é 100% digital. Assim que o pagamento for confirmado, você receberá um e-mail com o link para baixar todos os arquivos em formato PDF." 
            />
            <FAQItem 
              question="Preciso pagar frete?" 
              answer="Não! Como o produto é digital, você não paga frete e recebe o material instantaneamente no seu e-mail." 
            />
            <FAQItem 
              question="Para qual idade é indicado?" 
              answer="O kit foi desenvolvido para crianças de 3 a 10 anos, com atividades que variam em nível de dificuldade para atender diferentes fases do desenvolvimento." 
            />
            <FAQItem 
              question="Posso imprimir quantas vezes quiser?" 
              answer="Sim! O arquivo é seu para sempre. Você pode imprimir para seus filhos, sobrinhos, alunos ou para usar no ministério infantil da sua igreja quantas vezes desejar." 
            />
          </div>
        </div>
      </section>

      {/* 12. CTA FINAL */}
      <section className="py-20 bg-brand-dark text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Não perca a chance de abençoar a vida do seu filho hoje!
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de famílias que já estão ensinando a Bíblia de forma divertida e eficaz.
          </p>
          <Button variant="gold" className="mx-auto" onClick={() => document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })}>
            QUERO GARANTIR O KIT AGORA
          </Button>
          <p className="mt-8 text-sm text-blue-300">
            © {new Date().getFullYear()} Kit Bíblico Infantil. Todos os direitos reservados.
          </p>
        </div>
      </section>
    </div>
  );
}
