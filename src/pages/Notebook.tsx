import React, { useContext, useEffect, useState } from "react";
import "../stylesheets/Journal.css";
import Swal from "sweetalert2";

function Notebook() {
  interface JournalData {
    id: number;
    journalDate: string;
    sleepScore: number;
    bedTime: string;
    wakeUpTime: string;
    sleepNote: string;
    moodScore: number;
    moodNote: string;
    journalNote: string;
    firstGratitude: string;
    secondGratitude: string;
  }

  const sleepEmojiToNumber = {
    "🤩": 1,
    "🙂": 2,
    "🥱": 3,
    "😫": 4,
  };
  const numberToSleepEmoji = Object.fromEntries(
    Object.entries(sleepEmojiToNumber).map(([emoji, number]) => [
      number as number,
      emoji as string,
    ])
  );

  const moodEmojiToNumber = {
    "😁": 1,
    "🙂": 2,
    "😐": 3,
    "😔": 4,
  };
  const numberToMoodEmoji = Object.fromEntries(
    Object.entries(moodEmojiToNumber).map(([emoji, number]) => [
      number as number,
      emoji as string,
    ])
  );

  const [journal, setJournal] = useState<JournalData[]>([]);

  const [selectedSleepMood, setSelectedSleepMood] = useState<number>(0);
  const [bedTime, setBedTime] = useState<string>("");
  const [wakeUpTime, setWakeUpTime] = useState<string>("");
  const [sleepNote, setSleepNote] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState<number>(0);
  const [moodNote, setMoodNote] = useState<string>("");
  const [journalNote, setJournalNote] = useState<string>("");
  const [firstGratitude, setFirstGratitude] = useState<string>("");
  const [secondGratitude, setSecondGratitude] = useState<string>("");

  const serverurl = process.env.REACT_APP_SERVER_URL;

  const today: Date = new Date();
  const yearMonthDay: string = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

  const formatJournalDate = (date: string) => {
    const d = new Date(date as string);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  console.log(yearMonthDay);

  useEffect((): void => {
    const getJournal = async () => {
      try {
        const res = await fetch(
          `${serverurl}/get/journal/${localStorage.getItem("userId")}`
        );
        const json = await res.json();
        setJournal(json);
      } catch (error) {
        console.log(error);
      }
    };
    getJournal();
  }, []);

  const postJournal = async () => {
    let url = `${serverurl}/post/journal`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          journalDate: yearMonthDay,
          sleepScore: selectedSleepMood,
          bedTime: bedTime,
          wakeUpTime: wakeUpTime,
          sleepNote: sleepNote,
          moodScore: selectedMood,
          moodNote: moodNote,
          journalNote: journalNote,
          firstGratitude: firstGratitude,
          secondGratitude: secondGratitude,
          userId: localStorage.getItem("userId"),
        }),
      });
      const response = await res.json();
      console.log(response);
      Swal.fire({
        title: "Journal Posted!",
        text: "Remember to check in tomorrow!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Journal not posted",
        text: "Something went wrong, please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <>
        <div className="bg-gray-900 text-gray-900 text-2xl  m-4 rounded-lg">
          {journal.find(
            (item) => formatJournalDate(item.journalDate) === yearMonthDay
          ) ? (
            <div>
              <h1>Du har allerede skrevet dagbog i dag</h1>
              <p>
                Fundet dagbog for:{" "}
                {formatJournalDate(
                  journal.find(
                    (item) =>
                      formatJournalDate(item.journalDate) === yearMonthDay
                  ).journalDate
                )}
              </p>
              <p>I dag er: {yearMonthDay}</p>
            </div>
          ) : (
            <div className="bg-gray-900 text-gray-900 mb-4 p-4">
              <h1 className="text-2xl mb-6 text-center">Skriv dagens dagbog</h1>

              <div className="wrap-all text-gray-900">
                <div className="wrap-turn">
                  <div className="wrap-prev" data-page="0">
                    <div id="prev" className="page left">
                      <h2 className="text-2xl font-extrabold mb-6 text-center">
                        Today is{" "}
                        {`${today.getDate()}/${
                          today.getMonth() + 1
                        }/${today.getFullYear()}`}
                      </h2>
                      <div className="mb-12">
                        <h2 className="text-xl mb-4 text-center">
                          Sleep Board - How well did you sleep
                        </h2>
                        <div className="flex space-x-3 mb-6 justify-center ">
                          {Object.entries(sleepEmojiToNumber).map(
                            ([emoji, number]) => (
                              <label
                                key={emoji}
                                className="text-5xl cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name="sleepMood"
                                  className="hidden"
                                  value={number}
                                  onChange={() => setSelectedSleepMood(number)}
                                />
                                <span
                                  className={`p-2 rounded-full ${
                                    selectedSleepMood === number
                                      ? "bg-gray-100"
                                      : "hover:bg-gray-200"
                                  }`}
                                >
                                  {emoji}
                                </span>
                              </label>
                            )
                          )}
                        </div>

                        <div className="flex justify-between w-full max-w-xs my-4">
                          <div>
                            <label
                              htmlFor="bedTime"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Bed Time:
                            </label>
                            <input
                              type="time"
                              id="bedTime"
                              name="bedTime"
                              className="mt-1 p-2 rounded bg-gray-200 text-gray-900"
                              onChange={(e) => setBedTime(e.target.value)}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="wakeUpTime"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Wake Up Time:
                            </label>
                            <input
                              type="time"
                              id="wakeUpTime"
                              name="wakeUpTime"
                              className="mt-1 p-2 rounded bg-gray-200 text-gray-900"
                              onChange={(e) => setWakeUpTime(e.target.value)}
                            />
                          </div>
                        </div>

                        <textarea
                          placeholder="Reflect on your thoughts about sleep and dreams..."
                          onChange={(e) => setSleepNote(e.target.value)}
                          name="reason"
                          className="w-full p-2 rounded text-gray-900 bg-gray-200"
                          rows="5"
                          value={sleepNote}
                        ></textarea>
                      </div>

                      <div className="mb-12">
                        <h2 className="text-xl mb-4 text-center">
                          MoodBoard - How did you feel today
                        </h2>
                        <div className="flex space-x-3 justify-center ">
                          {Object.entries(moodEmojiToNumber).map(
                            ([emoji, number]) => (
                              <label
                                key={emoji}
                                className="text-5xl cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name="mood"
                                  className="hidden"
                                  value={number}
                                  onChange={() => setSelectedMood(number)}
                                />
                                <span
                                  className={`p-2 rounded-full ${
                                    selectedMood === number
                                      ? "bg-gray-300"
                                      : "hover:bg-gray-200"
                                  }`}
                                >
                                  {emoji}
                                </span>
                              </label>
                            )
                          )}
                        </div>
                      </div>

                      <div className="mb-12">
                        <h2 className="text-xl mb-4 text-center">
                          Free journaling - a space to reflect on your thoughts
                        </h2>
                        <textarea
                          placeholder="Text anything you wish..."
                          onChange={(e) => setMoodNote(e.target.value)}
                          className="w-full p-2 rounded text-gray-900 bg-gray-200"
                          rows="10"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="wrap-curr">
                    <div id="current" className="page right" data-page="1">
                      <div className="mb-12">
                        <h2 className="text-xl mb-4 text-center">
                          What have I learned today - workwise or personal
                          development.
                        </h2>
                        <textarea
                          placeholder="Text anything you wish..."
                          onChange={(e) => setJournalNote(e.target.value)}
                          className="w-full p-2 rounded text-gray-900 bg-gray-200"
                          rows="10"
                        ></textarea>
                      </div>

                      <div className="mb-12">
                        <h2 className="text-xl mb-4 text-center">
                          2 Keynotes you are grateful for? / 2 things to tell
                          your future self
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                          <input
                            type="text"
                            placeholder="You are awesome..."
                            onChange={(e) => setFirstGratitude(e.target.value)}
                            className="w-3/4 h-12 p-2 rounded bg-gray-200 text-gray-900"
                          />
                          <input
                            type="text"
                            placeholder="Friends & Family..."
                            onChange={(e) => setSecondGratitude(e.target.value)}
                            className="w-3/4 h-12 p-2 rounded bg-gray-200 text-gray-900"
                          />
                        </div>
                      </div>
                      <button onClick={postJournal} className=" scale-110">
                        Post
                      </button>
                    </div>
                  </div>

                  {/* <div className="wrap-back">
      <div id="back" className="page" >
       
      </div>
    </div> */}
                </div>
                <div className="edge-left edge"></div>
                <div className="edge-right edge"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          {journal.map((item) => (
            <div
              key={item.id}
              className="bg-gray-700 text-gray-800 my-4 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                <b className="text-gray-100 text-4xl">
                  {new Date(item.journalDate).toLocaleDateString()}
                </b>
              </h2>
              <div className="grid grid-cols-2 gap-6 ">
                <div className="bg-gray-900 text-gray-100 p-8 rounded ">
                  <p className="text-lg">
                    <span className="font-bold text-4xl">
                      {numberToSleepEmoji[item.sleepScore]}
                    </span>
                  </p>
                  <p className="text-lg mt-2">
                    <b className="text-2xl text-green-700">Seng:</b>{" "}
                    <span className="font-bold">{item.bedTime}</span>
                  </p>
                  <p className="text-xl leading-8 tracking-wide">
                    <b className="text-2xl text-green-700">Vågnet:</b>{" "}
                    <span className="font-bold">{item.wakeUpTime}</span>
                  </p>
                  <p className="text-xl mt-4 leading-8 tracking-wide">
                    <b className="text-2xl text-green-700">Søvnnoter:</b> <br />
                    <span>{item.sleepNote}</span>
                  </p>
                </div>
                <div className="bg-gray-900 text-gray-100 p-8 rounded">
                  <p className="text-xl leading-8 tracking-wide">
                    <span className="font-bold text-4xl">
                      {numberToMoodEmoji[item.moodScore]}
                    </span>
                  </p>
                  <p className="text-xl mt-2 leading-8 tracking-wide">
                    <b className="text-2xl text-green-700">Taknemmelighed 1:</b>{" "}
                    <br />
                    <span>{item.firstGratitude}</span>
                  </p>
                  <p className="text-xl leading-8 tracking-wide">
                    <b className="text-2xl text-green-700">Taknemmelighed 2:</b>{" "}
                    <br />
                    <span>{item.secondGratitude}</span>
                  </p>
                  <p className="text-xl mt-4 leading-8 tracking-wide">
                    <b className="text-2xl text-green-700">Dagbog:</b> <br />{" "}
                    <span>{item.moodNote}</span>
                  </p>
                  <p className="text-xl mt-4 leading-8 tracking-wide">
                    <b className="text-2xl text-green-700">Lært:</b> <br />{" "}
                    <span className="leading-8 tracking-wide tracking-wide">
                      {item.journalNote}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

export default Notebook;
