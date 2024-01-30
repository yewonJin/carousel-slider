type Props = {
  length: number;
  curPage: number;
};

export default function CarouselIndicator(props: Props) {
  const { length, curPage } = props;

  return (
    <div className="flex absolute bottom-3 w-full justify-center gap-4">
      {Array.from({ length }).map((_, i) => (
        <button
          key={i}
          className={`w-[14px] h-[14px] rounded-full ${
            curPage === i ? "bg-neutral-300" : "bg-neutral-400 "
          }`}
        ></button>
      ))}
    </div>
  );
}
