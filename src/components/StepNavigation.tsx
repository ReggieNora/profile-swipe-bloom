import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
}

export const StepNavigation = ({
  onPrevious,
  onNext,
  showPrevious = true,
  showNext = true,
}: StepNavigationProps) => {
  return (
    <>
      {showPrevious && (
        <button
          onClick={onPrevious}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300 z-10 shadow-lg hover:shadow-white/20 hover:scale-105"
          aria-label="Previous step"
        >
          <ArrowLeft className="text-white" size={20} />
        </button>
      )}
      {showNext && (
        <button
          onClick={onNext}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300 z-10 shadow-lg hover:shadow-white/20 hover:scale-105"
          aria-label="Next step"
        >
          <ArrowRight className="text-white" size={20} />
        </button>
      )}
    </>
  );
};
