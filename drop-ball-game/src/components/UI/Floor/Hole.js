export default function Hole({ gapPosition }) {
  return (
    <>
      <div
        id="hole"
        style={{
          width: 50,
          height: 20,
          position: "relative",
          backgroundColor: "white",
          left: gapPosition,
        }}
      ></div>
    </>
  );
}
