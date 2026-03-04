import type { MCQ } from "@/backend.d.ts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllBodySystems, useGetAllMCQs } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  Bone,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Info,
  RotateCcw,
  Trophy,
  Utensils,
  Wind,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const SYSTEM_ICONS: Record<string, React.ElementType> = {
  "skeletal-system": Bone,
  "nervous-system": Brain,
  "cardiovascular-system": Activity,
  "respiratory-system": Wind,
  "digestive-system": Utensils,
};

const SYSTEM_GRADIENTS: Record<string, string> = {
  "skeletal-system": "from-amber-600 to-amber-800",
  "nervous-system": "from-violet-600 to-violet-800",
  "cardiovascular-system": "from-red-600 to-red-800",
  "respiratory-system": "from-sky-600 to-sky-800",
  "digestive-system": "from-emerald-600 to-emerald-800",
};

// MCQ Component
function MCQCard({
  mcq,
  index,
  onAnswer,
  selectedAnswer,
}: {
  mcq: MCQ;
  index: number;
  onAnswer: (id: bigint, option: string) => void;
  selectedAnswer?: string;
}) {
  const options = [
    { key: "A", value: mcq.optionA },
    { key: "B", value: mcq.optionB },
    { key: "C", value: mcq.optionC },
    { key: "D", value: mcq.optionD },
  ];
  const answered = !!selectedAnswer;

  return (
    <div
      className="bg-white border border-border rounded-xl p-5"
      data-ocid={`mcq.item.${index + 1}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <p className="font-medium text-foreground leading-relaxed">
          {mcq.question}
        </p>
      </div>

      <div className="space-y-2 mb-3">
        {options.map(({ key, value }) => {
          const isCorrect = key === mcq.correctOption;
          const isSelected = key === selectedAnswer;
          let optionClass =
            "border border-border bg-muted/30 hover:bg-teal-50 hover:border-teal-200 cursor-pointer";
          if (answered) {
            if (isCorrect)
              optionClass =
                "border-2 border-green-500 bg-green-50 cursor-default";
            else if (isSelected && !isCorrect)
              optionClass = "border-2 border-red-400 bg-red-50 cursor-default";
            else
              optionClass =
                "border border-border bg-muted/20 cursor-default opacity-60";
          }

          return (
            <button
              type="button"
              key={key}
              disabled={answered}
              onClick={() => !answered && onAnswer(mcq.id, key)}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${optionClass}`}
              data-ocid="mcq.toggle"
            >
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${answered && isCorrect ? "bg-green-500 text-white" : ""}
                  ${answered && isSelected && !isCorrect ? "bg-red-400 text-white" : ""}
                  ${!answered || (!isSelected && !isCorrect) ? "bg-teal-100 text-teal-700" : ""}
                `}
              >
                {key}
              </span>
              <span className="flex-1">{value}</span>
              {answered && isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              )}
              {answered && isSelected && !isCorrect && (
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="neet-highlight mt-3 rounded-r-lg">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-700 mb-0.5">
                    Explanation
                  </p>
                  <p className="text-sm text-amber-900/80 leading-relaxed">
                    {mcq.explanation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextBlock({ text }: { text: string }) {
  const paragraphs = text
    .split(". ")
    .reduce<string[]>((acc, _sentence, i, arr) => {
      if (i % 3 === 0)
        acc.push(
          arr.slice(i, i + 3).join(". ") + (i + 3 < arr.length ? "" : ""),
        );
      return acc;
    }, []);

  return (
    <div className="space-y-3">
      {paragraphs.map((para) => (
        <p
          key={para.slice(0, 30)}
          className="text-foreground/80 leading-relaxed text-sm sm:text-base"
        >
          {para}
        </p>
      ))}
    </div>
  );
}

function NeetPointsList({ text }: { text: string }) {
  const points = text.split(". ").filter(Boolean);
  return (
    <ul className="space-y-2.5">
      {points.map((point) => (
        <li
          key={point.slice(0, 30)}
          className="neet-highlight flex items-start gap-2.5"
        >
          <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-amber-900/80">{point.trim()}</span>
        </li>
      ))}
    </ul>
  );
}

function DisordersList({ text }: { text: string }) {
  const disorders = text.split(". ").filter(Boolean);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {disorders.map((disorder) => {
        const [name, ...rest] = disorder.split(":");
        return (
          <div
            key={disorder.slice(0, 30)}
            className="bg-red-50 border border-red-100 rounded-lg p-3.5"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-800 text-sm">
                  {name.trim()}
                </p>
                {rest.length > 0 && (
                  <p className="text-red-700/70 text-xs mt-0.5">
                    {rest.join(":").trim()}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SystemDetailPage() {
  const { slug } = useParams({ from: "/system/$slug" });
  const { data: systems, isLoading: systemsLoading } = useGetAllBodySystems();
  const { data: allMcqs, isLoading: mcqsLoading } = useGetAllMCQs();

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizReset, setQuizReset] = useState(0);

  const system = systems?.find((s) => s.slug === slug);
  const systemMcqs =
    allMcqs?.filter((m) => system && m.systemId === system.id) ?? [];

  const Icon = SYSTEM_ICONS[slug] || BookOpen;
  const gradient = SYSTEM_GRADIENTS[slug] || "from-teal-600 to-teal-800";

  const handleAnswer = (id: bigint, option: string) => {
    setAnswers((prev) => ({ ...prev, [String(id)]: option }));
  };

  const handleReset = () => {
    setAnswers({});
    setQuizReset((n) => n + 1);
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = systemMcqs.filter(
    (m) => answers[String(m.id)] === m.correctOption,
  ).length;

  if (systemsLoading) {
    return (
      <main
        className="container mx-auto px-4 py-10"
        data-ocid="system.loading_state"
      >
        <Skeleton className="h-52 rounded-2xl mb-6" />
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-80 rounded-2xl" />
      </main>
    );
  }

  if (!system) {
    return (
      <main
        className="container mx-auto px-4 py-20 text-center"
        data-ocid="system.error_state"
      >
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30" />
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          System not found
        </h2>
        <p className="text-muted-foreground mb-6">
          This body system doesn't exist yet.
        </p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Header */}
      <section className={`bg-gradient-to-r ${gradient} text-white`}>
        <div className="container mx-auto px-4 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/60 text-sm mb-5">
            <Link
              to="/"
              className="hover:text-white transition-colors"
              data-ocid="breadcrumb.link"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{system.name}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                {system.name}
              </h1>
              <p className="text-white/75 leading-relaxed max-w-xl text-sm sm:text-base">
                {system.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="structure" className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full bg-muted/60 p-1 rounded-xl h-auto">
                {[
                  { value: "structure", label: "Structure" },
                  { value: "function", label: "Function" },
                  { value: "neet", label: "NEET Points" },
                  { value: "disorders", label: "Disorders" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="text-xs sm:text-sm font-medium rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-xs data-[state=active]:text-teal-700"
                    data-ocid="system.tab"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent
                value="structure"
                className="bg-white border border-border rounded-2xl p-6 shadow-xs"
              >
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  Structure
                </h2>
                <TextBlock text={system.structureText} />
              </TabsContent>

              <TabsContent
                value="function"
                className="bg-white border border-border rounded-2xl p-6 shadow-xs"
              >
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  Functions
                </h2>
                <TextBlock text={system.functionText} />
              </TabsContent>

              <TabsContent
                value="neet"
                className="bg-white border border-border rounded-2xl p-6 shadow-xs"
              >
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    NEET High-Yield Points
                  </h2>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                    Exam Focus
                  </Badge>
                </div>
                <NeetPointsList text={system.neetPoints} />
              </TabsContent>

              <TabsContent
                value="disorders"
                className="bg-white border border-border rounded-2xl p-6 shadow-xs"
              >
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  Common Disorders
                </h2>
                <DisordersList text={system.commonDisorders} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Diagram sidebar */}
          <div className="space-y-4">
            <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-xs">
              <div className="p-4 border-b border-border">
                <h3 className="font-display font-bold text-foreground text-sm">
                  Anatomical Diagram
                </h3>
              </div>
              {system.diagramUrl ? (
                <img
                  src={system.diagramUrl}
                  alt={`${system.name} diagram`}
                  className="w-full h-auto"
                />
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground text-sm bg-muted/30">
                  Diagram coming soon
                </div>
              )}
            </div>

            {/* Quick stats */}
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4">
              <h3 className="font-display font-bold text-teal-800 text-sm mb-3">
                System Overview
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-teal-700/70">MCQ Questions</span>
                  <Badge className="bg-teal-100 text-teal-700">
                    {systemMcqs.length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-teal-700/70">Topics Covered</span>
                  <Badge className="bg-teal-100 text-teal-700">
                    4 sections
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MCQ Practice Section */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                MCQ Practice
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Test your knowledge on {system.name}
              </p>
            </div>
            {answeredCount > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white border border-border rounded-xl px-4 py-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-semibold">
                    {correctCount}/{answeredCount} correct
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="gap-1.5"
                  data-ocid="mcq.secondary_button"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </Button>
              </div>
            )}
          </div>

          {mcqsLoading ? (
            <div className="space-y-3" data-ocid="mcq.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : systemMcqs.length === 0 ? (
            <div
              className="text-center py-12 bg-white border border-border rounded-2xl"
              data-ocid="mcq.empty_state"
            >
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-30" />
              <p className="text-muted-foreground">
                MCQs for this system are being prepared.
              </p>
            </div>
          ) : (
            <div className="space-y-4" key={quizReset}>
              {systemMcqs.map((mcq, i) => (
                <MCQCard
                  key={String(mcq.id)}
                  mcq={mcq}
                  index={i}
                  onAnswer={handleAnswer}
                  selectedAnswer={answers[String(mcq.id)]}
                />
              ))}
              {answeredCount === systemMcqs.length && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 text-white text-center"
                  data-ocid="mcq.success_state"
                >
                  <Trophy className="w-10 h-10 mx-auto mb-2 text-amber-300" />
                  <h3 className="font-display text-xl font-bold mb-1">
                    Quiz Complete! {correctCount}/{systemMcqs.length} Correct
                  </h3>
                  <p className="text-teal-100/80 text-sm mb-4">
                    {correctCount === systemMcqs.length
                      ? "Perfect score! You've mastered this section."
                      : correctCount >= systemMcqs.length * 0.7
                        ? "Great performance! Review the explanations to perfect your score."
                        : "Keep practicing — review the explanations and try again."}
                  </p>
                  <Button
                    onClick={handleReset}
                    className="bg-white text-teal-700 hover:bg-teal-50"
                    data-ocid="mcq.primary_button"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
