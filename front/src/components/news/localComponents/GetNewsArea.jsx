export function GetNewsArea({ data }) {
  if (data.type === "text") {
    return (
      <data.tegName
        style={{
          color: `${data.color}`,
        }}
      >
        {data.text}
      </data.tegName>
    );
  } else if (data.type === "image") {
    return (
      <img
      style={{
        width: '100%'
      }}
       src={data.path} alt="img-hz" />
    );
  }
}
