import { AiOutlineInfoCircle } from "react-icons/ai";

const Tooltip = () => {
    return (
        <div className="tooltip left">
            <AiOutlineInfoCircle color="FFF" />
            <span className="tiptext">Minimum six months</span>
        </div>
    );
};

export default Tooltip;
