interface Props {
  image: string;
  title: string;
  price: number;
}

export default function ProductCard({ image, title, price }: Props) {
  return (
    <div className="border p-2">
      <img src={image} alt={title} width="300" height="300" />
      <h2>{title}</h2>
      <h3>{price}</h3>
    </div>
  );
}
