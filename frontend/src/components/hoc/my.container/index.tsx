export default function MyContainer({ children, className }: any) {
  return (
    <div className={"bg-white rounded-4 shadow p-4 mb-4 d-flex" + className}>
      {children}
    </div>
  );
}
