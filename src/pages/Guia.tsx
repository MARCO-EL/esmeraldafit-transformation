import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Chapter {
  id: number;
  title: string;
  content: string;
}

const chapters: Chapter[] = [
  { id: 1, title: "Preparando-se para o Sucesso", content: "Definir metas claras é o primeiro passo. Seja emagrecer ou ganhar massa, crie uma rotina realista. Equipamentos essenciais: para casa, elásticos e peso corporal são suficientes. Na academia, aproveite a variedade de equipamentos. A alimentação impacta diretamente seus resultados — treino e dieta andam juntos." },
  { id: 2, title: "Fisiologia e Fundamentos", content: "O corpo queima gordura quando há déficit calórico e constrói músculos com estímulo + proteína + descanso. Resistência muscular vem com mais repetições e menos carga. Hipertrofia requer carga progressiva. O cardio complementa ambos os objetivos." },
  { id: 3, title: "Treino para Emagrecimento", content: "HIIT (treino intervalado) é altamente eficiente: alterna 30s de esforço máximo com 30s de descanso. Circuitos de corpo livre em 20-30 min queimam 200-350 kcal. Frequência ideal: 3-5x/semana. Combine cardio com exercícios compostos para maximizar a queima." },
  { id: 4, title: "Treino para Hipertrofia", content: "Foco em exercícios compostos: agachamento, supino, remada. Use 3-4 séries de 8-12 reps com carga progressiva. Descanso de 60-120s entre séries. Progressão: aumente 2-5% de carga quando completar todas as reps com RIR ≥ 2." },
  { id: 5, title: "Nutrição Completa", content: "Emagrecimento: déficit de 300-500 kcal/dia. Hipertrofia: superávit de 200-350 kcal. Proteína: 1,6-2,2g/kg/dia. Monte seu prato: 1/4 proteína, 1/4 carboidrato complexo, 1/2 vegetais. Suplementos úteis: whey protein e creatina monohidratada 3-5g/dia." },
  { id: 6, title: "Descanso e Recuperação", content: "Durma 7-9h por noite — é quando o GH (hormônio do crescimento) atinge seu pico. Respeite 48h entre treinos do mesmo grupo muscular. Alongamento pós-treino reduz DOMS. Semanas de deload (volume -30%) a cada 4-6 semanas previnem overtraining." },
  { id: 7, title: "Erros Comuns a Evitar", content: "Não pular o aquecimento (5-10 min). Não progredir carga muito rápido. Não treinar o mesmo grupo todos os dias. Não negligenciar sono e hidratação. Acompanhe progresso com fotos semanais e medidas, não apenas a balança." },
  { id: 8, title: "Psicologia e Motivação", content: "Crie metas SMART: específicas, mensuráveis, alcançáveis, relevantes e com prazo. Celebre pequenas vitórias. Nos dias difíceis, faça pelo menos 10 minutos — o hábito importa mais que a intensidade. Encontre um parceiro de treino para accountability." },
  { id: 9, title: "Variação de Treinos", content: "Mude exercícios a cada 4-6 semanas para evitar platôs. Alterne entre séries retas, drop sets, supersets e circuitos. Experimente novas modalidades: calistenia, funcional, pilates. A variação mantém o corpo adaptando e a mente engajada." },
  { id: 10, title: "Saúde Mental", content: "Exercício libera endorfina, serotonina e dopamina. Pratique mindfulness durante os treinos: foco na contração e respiração. Técnica de respiração 4-7-8 para reduzir ansiedade. O fitness é uma jornada de autoconhecimento, não punição." },
  { id: 11, title: "Alongamento e Mobilidade", content: "Alongamento estático pós-treino: 20-30s por grupo. Mobilidade articular pré-treino: rotações, agachamentos profundos. Foque em quadril, torácica e tornozelo. 10-15 min de mobilidade reduzem risco de lesão significativamente." },
  { id: 12, title: "Avaliando seu Progresso", content: "Pese-se sempre no mesmo horário, em jejum. Tire fotos na mesma posição e iluminação. Meça circunferências: peito, cintura, quadril, braço, coxa. Reavalie a cada 4 semanas. Se estagnado, ajuste calorias ou volume de treino." },
  { id: 13, title: "Suplementação", content: "Whey protein: 20-30g pós-treino. Creatina: 3-5g diários (não precisa de fase de carga). Cafeína: 3-6mg/kg 30 min antes do treino. Multivitamínico: apenas se há deficiência comprovada. Priorize alimentos reais sobre suplementos." },
  { id: 14, title: "Cardápios e Receitas", content: "Café: ovos + aveia + frutas (350 kcal). Almoço: arroz + feijão + proteína + salada (650 kcal). Lanche: fruta + oleaginosas (220 kcal). Jantar: proteína + legumes (420 kcal). Prepare marmitas no domingo para a semana toda — meal prep é seu aliado." },
  { id: 15, title: "Treinos Rápidos (20 min)", content: "EMOM 20 min: min ímpar — 12 agachamentos, min par — 8 flexões. Tabata 4 min: 20s máximo / 10s descanso x8 rounds. Circuito 3 exercícios: agachamento + flexão + prancha, 4 rounds sem descanso. Eficiente para dias sem tempo." },
  { id: 16, title: "Hábitos Duradouros", content: "Comece pequeno: 10 min/dia. Associe o treino a um hábito existente (âncora). Não dependa de motivação — construa disciplina. Em 21 dias forma-se um hábito, em 90 dias um estilo de vida. Sua transformação é permanente." },
  { id: 17, title: "Platôs e Como Superá-los", content: "Platô é normal após 4-8 semanas. Estratégias: mude a ordem dos exercícios, aumente volume, reduza descanso. Técnica de deload: 1 semana com 60-70% do volume normal. Ajuste calorias: adicione ou remova 100-200 kcal e observe por 2 semanas." },
  { id: 18, title: "Prevenção de Lesões", content: "Aquecimento dinâmico obrigatório. Técnica correta antes de carga pesada. Nunca treine com dor aguda articular. Fortaleça rotadores do ombro e estabilizadores do joelho. Se lesionado, procure um fisioterapeuta antes de voltar." },
  { id: 19, title: "Hidratação", content: "Beba 30-40 ml/kg/dia. Em treinos intensos ou calor, adicione 500ml extras. Sinais de desidratação: urina escura, fadiga, dor de cabeça. Beba água antes, durante e após o treino. Evite beber grandes volumes de uma vez — distribua ao longo do dia." },
  { id: 20, title: "Vida Social e Treino", content: "Planeje treinos como compromissos. Treine de manhã para liberar a noite. Convide amigos para treinar junto. Em eventos sociais, faça escolhas conscientes sem culpa. Equilíbrio é sustentabilidade." },
  { id: 21, title: "Controle de Estresse", content: "Cortisol elevado = retenção de gordura + catabolismo. Técnicas: meditação 5 min/dia, respiração profunda, caminhadas na natureza. Limite telas 1h antes de dormir. Hobbies e conexões sociais são anti-estresse poderosos." },
  { id: 22, title: "Conclusão e Próximos Passos", content: "Você tem todas as ferramentas. Implemente gradualmente. Seja consistente. Celebre cada vitória. Sua transformação não é apenas física — é mental. Cada treino te torna mais forte. No próximo volume: técnicas avançadas e periodização." },
];

export default function Guia() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<number | null>(null);
  const readCount = 0;
  const progress = Math.round((readCount / chapters.length) * 100);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl px-4 pt-4 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Guia Fitness</h1>
        </div>
        <p className="text-xs text-muted-foreground mb-2">22 capítulos • Seu guia completo de transformação</p>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-2 mt-4">
        {chapters.map((ch, i) => (
          <motion.div
            key={ch.id}
            className="surface-card overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
          >
            <button
              onClick={() => setOpen(open === ch.id ? null : ch.id)}
              className="w-full p-4 flex items-center gap-3 text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-light flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary">{ch.id}</span>
              </div>
              <span className="flex-1 font-semibold text-sm">{ch.title}</span>
              <ChevronRight
                className={`w-4 h-4 text-muted-foreground transition-transform ${open === ch.id ? "rotate-90" : ""}`}
              />
            </button>

            {open === ch.id && (
              <motion.div
                className="px-4 pb-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="max-w-[65ch] mx-auto">
                  <p className="text-sm text-muted-foreground leading-relaxed">{ch.content}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
