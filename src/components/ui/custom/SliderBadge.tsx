export const SliderBadge = ({ value }: { value: number }) => {
    return (
        <div
            className="block size-4 shrink-0 rounded-full border
  border-primary bg-white shadow-sm ring-ring/50
  transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4
  focus-visible:outline-hidden disabled:pointer-events-none
  disabled:opacity-50 relative"
        >
            <div
                className={
                    'speech-bubble' +
                    'absolute w-12 h-8 text-center content-center -bottom-10 left-1/2-translate-x-1/2'
                }
            >
                <span>{value}</span>
            </div>
        </div>
    );
};
