import { dbService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function Commentlist({
  commentObj,
  isOwner,
  detailObj,
  qnaObj,
  isOpener,
}) {
  const onCommentDeleteClick = async (event) => {
    if (isOwner) {
      event.preventDefault();
      Swal.fire({
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "취소",
        confirmButtonText: "삭제",
        confirmButtonColor: "#1f54c0",
        text: "이 댓글을 삭제하시겠습니까?",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dbService
            .doc(`startlist/${detailObj}`)
            .collection("QnA")
            .doc(`${qnaObj.id}`)
            .collection("comments")
            .doc(`${commentObj.id}`)
            .delete();
        }
      });
      // const ok = window.confirm("이 댓글을 삭제하시겠습니까?");
      // if (ok) {
      //   await dbService
      //     .doc(`startlist/${detailObj}`)
      //     .collection("QnA")
      //     .doc(`${qnaObj.id}`)
      //     .collection("comments")
      //     .doc(`${commentObj.id}`)
      //     .delete();
      // }
    } else {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "#1f54c0",
        text: "권한이 없습니다.",
      });
      // window.confirm("You don't have permission.");
    }
  };
  return (
    <>
      {isOpener ? (
        <>
          <div className="comment_retext">
            <img width="12%" src="img/chong.png"></img>
            <b>총대</b> {commentObj.text}
          </div>

          {isOwner && (
            <span className="comment_trashbtn" onClick={onCommentDeleteClick}>
              <FontAwesomeIcon icon={faTrash} color={"#407FFF"} />
            </span>
          )}
        </>
      ) : (
        <>
          <div className="comment_retext">
            <img width="11%" src="img/noonsong.gif"></img>
            <b>{commentObj.userName}</b> &nbsp; {commentObj.text}
          </div>
          {isOwner && (
            <span className="comment_trashbtn" onClick={onCommentDeleteClick}>
              <FontAwesomeIcon icon={faTrash} color={"#407FFF"} />
            </span>
          )}
        </>
      )}
    </>
  );
}
