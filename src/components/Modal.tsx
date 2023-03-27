import MuiModal from "@mui/material/Modal"
import {useRecoilState} from "recoil";
import {modalState} from "@/atoms/modalAtom";
import {XIcon} from "@heroicons/react/outline";
function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const handleClose = () => {
        setShowModal(false)
    }
    return (
        <MuiModal open={showModal} onClose={handleClose}>
            <>
                <button onClick={handleClose} className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none
                bg-[#141414] hover:bg-[#141414]">
                    <XIcon className="h-6 w-6"/>
                </button>

                <div>

                </div>
            </>
        </MuiModal>
    );
}

export default Modal;