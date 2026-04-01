export default function Aurora() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-[20%] -left-[10%] h-[700px] w-[700px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.3), transparent 70%)",
          filter: "blur(120px)",
          animation: "aurora-float 15s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute top-[20%] -right-[15%] h-[600px] w-[600px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(45,95,138,0.5), transparent 70%)",
          filter: "blur(120px)",
          animation: "aurora-float 15s ease-in-out infinite alternate",
          animationDelay: "-5s",
        }}
      />
      <div
        className="absolute -bottom-[10%] left-[30%] h-[500px] w-[500px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.15), transparent 70%)",
          filter: "blur(120px)",
          animation: "aurora-float 15s ease-in-out infinite alternate",
          animationDelay: "-10s",
        }}
      />
    </div>
  );
}
