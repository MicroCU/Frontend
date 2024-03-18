import { useTranslation } from "@/context/Translation";

type I18nProps = React.HTMLProps<HTMLParagraphElement>;

const I18nTypo = ({ children, ...props }: I18nProps) => {
  const { lang } = useTranslation();
  return (
    <p lang={lang} {...props}>
      {children}
    </p>
  );
};

export default I18nTypo;
