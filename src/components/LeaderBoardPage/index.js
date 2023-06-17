import React from "react";
import "./LeaderBoardPage.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserListSorted } from "../../redux/slices/userSlice";
const LeaderBoardPage = () => {
  const dispatch = useDispatch();
  const userListSorted = useSelector(selectUserListSorted);
  return (
    <div>
      <h1 className="">Leaderboard</h1>

      <table className="">
        <thead className="">
          <tr className="">
            <th className="">User</th>
            <th className="">Answered</th>
            <th className="">Created</th>
          </tr>
        </thead>
        <tbody className="">
          {userListSorted.length > 0 &&
            userListSorted.map((user) => (
              <tr key={user.id}>
                <td className="">
                  <img src={user.avatarURL} />
                  <br />
                  <span className="">{user.name}</span>
                </td>
                <td className="">{Object.keys(user.answers).length}</td>
                <td className="">{user.questions.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoardPage;
