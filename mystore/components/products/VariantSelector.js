"use client";

export default function VariantSelector({
  variants,
  selectedVariant,
  onVariantChange,
}) {
  return (
    <div className="mb-4">
      <h6>Select Variant</h6>

      <select
        className="form-select"
        value={selectedVariant.id}
        onChange={(e) => {
          const variant = variants.find(
            (v) => v.id === Number(e.target.value)
          );

          onVariantChange(variant);
        }}
      >
        {variants.map((variant) => (
          <option
            key={variant.id}
            value={variant.id}
          >
            {variant.size} / {variant.color}
          </option>
        ))}
      </select>
    </div>
  );
}