import "./Random.css";

function Random(props) {
    const randomValue = Math.floor(Math.random() * (props.max - props.min + 1)) + props.min;
    return (
        <div className="random">
            Random value between {props.min} and {props.max} = {randomValue}
        </div>
    );
}

export default Random;