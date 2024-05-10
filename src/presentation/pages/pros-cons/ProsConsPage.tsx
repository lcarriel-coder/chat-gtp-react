import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox, GptOrthographyMessage } from "../../components"
import { orthographyUseCase } from "../../../core/use-cases";
import { propsConsUseCase } from "../../../core/use-cases/pros-cons-use-case";


interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[],
    message: string
  }

}
export const ProsConsPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {

    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, content } = await propsConsUseCase(text);

    if (!ok) {
      setMessages((prev) => [...prev, { text: "No se pudo realizar la correción", isGpt: false }]);
    } else {
      setMessages((prev) => [...prev,
      {
        text: content,
        isGpt: true,

      }
      ]);
    }
    //TODO: UseCase

    setIsLoading(false);

    // Todo: Añadir el mensaje de isGPT en true


  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          <GptMessage text="Puedes escribir lo que sea que quieras que compare y te de mis puntos de vista" />
          {
            messages.map((message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={index}
                    text={ message.text }

                  />
                )
                : (
                  <MyMessage key={index} text={message.text} />
                )

            ))
          }


          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }



        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe aqui lo que deseas"
        disableCorrections
      />

    </div>
  )
}
