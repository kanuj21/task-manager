import { MdDone } from "react-icons/md";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "../ui/button";

const SuccessPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="text-center space-y-4 py-6">
    <MdDone className="text-green-500 text-5xl mx-auto" />
    <p className="text-lg font-semibold">Task has been successfully processed!</p>
    <DialogFooter>
      <Button onClick={(event) => {
        event.preventDefault();
        onClose();
      }}>Back</Button>
    </DialogFooter>
  </div>
);

export default SuccessPopup;



// import { MdDone } from "react-icons/md";
// import { DialogFooter } from "@/components/ui/dialog";
// import { Button } from "../ui/button";

// export const SuccessPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => (
//     <div className="text-center space-y-4 py-6">
//       <MdDone className="text-green-500 text-5xl mx-auto" />
//       <p className="text-lg font-semibold">Task has been successfully processed!</p>
//       <DialogFooter>
//         <Button onClick={(event) => {
//           event.preventDefault();
//           onClose();
//         }}>Back</Button>
//       </DialogFooter>
//     </div>
//   );