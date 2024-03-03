import "../index.css";
import Chatnav from "./Chatnav";
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  return (
    <div className="chat w-full h-full bg-zinc-200 flex flex-col">
      <div className=" max-h-40">
        <Chatnav />
      </div>

      <p className="w-full h-full overflow-y-scroll">
        <Messages />
      </p>
      <div className=" h-14 bottom-0 w-full">
        <Input />
      </div>
    </div>
  );
};

export default Chat;
