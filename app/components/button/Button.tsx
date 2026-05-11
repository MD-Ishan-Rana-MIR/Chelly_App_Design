"use client";

type Props = {
    text: string;
    onClick?: () => void;

    // ✅ optional loading
    loading?: boolean;

    py?: string;
    px?: string;
    color?: string;
    backgroundColor?: string;
    textSize?: string;
    borderRadius?: string;
    fontWeight?: string;
    width?: string;
};

const Button = ({
    text,
    onClick,
    loading,
    py = "12px",
    px = "16px",
    color = "#fff",
    backgroundColor = "#0b7211",
    textSize = "14px",
    borderRadius = "10px",
    fontWeight = "600",
    width = "auto",
}: Props) => {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            style={{
                width,
                padding: `${py} ${px}`,
                color,
                backgroundColor,
                fontSize: textSize,
                borderRadius,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight,
                opacity: loading ? 0.7 : 1,
                transition: "all 0.3s ease",
            }}
        >
            {loading ? "Loading..." : text}
        </button>
    );
};

export default Button;