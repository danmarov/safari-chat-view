import "./App.css";
import FullViewportContainer from "./components/providers/FullViewportContainer";

function App() {
  return (
    <>
      <FullViewportContainer element={"div"}>
        <header>Какакя то шапка</header>

        <div className="chat-wrapper">
          <div className="chat-content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rem
            cumque accusantium.
            <h2>Viewport Info</h2>
            <p className="lorem">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
              iure rem sint fugiat. Velit et est error ea harum molestias vitae
              sapiente nemo delectus, deleniti magni rerum unde obcaecati
              provident aliquam, saepe eos minus exercitationem facilis! Tempore
              recusandae vitae iusto cumque nihil officia similique temporibus
              ipsam aliquam quas? Laudantium, quam modi. Voluptates eum commodi
              asperiores laudantium? At maxime aliquid molestiae explicabo? Eum
              asperiores consectetur aliquid labore officia corporis aperiam.
              Earum amet, minima nulla laborum id architecto nihil ea dolor quod
              ratione iste minus eveniet voluptates dolorum quaerat ullam cum
              nisi praesentium autem, beatae, omnis rem cumque. Minus
              repudiandae consectetur nam.
            </p>
          </div>
        </div>
        <div className="send-message-wrapper">
          <input type="text" className="input" />
        </div>
      </FullViewportContainer>
    </>
  );
}

export default App;
