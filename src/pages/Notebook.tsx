import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../components/Base/Login";
import LoginForm from "../components/Base/LoginForm";
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

  useEffect(() => {
    checkPassword();
  }, []);

  const { loginStatus, checkPassword } = useContext(LoginContext);

  const sleepEmojiToNumber = {
    "🤩": 1,
    "🙂": 2,
    "🥱": 3,
    "😫": 4,
  };
  const numberToSleepEmoji = Object.fromEntries(
    Object.entries(sleepEmojiToNumber).map(([emoji, number]) => [number as number, emoji as string])
  );

  const moodEmojiToNumber = {
    "😁": 1,
    "🙂": 2,
    "😐": 3,
    "☹️": 4,
  };
  const numberToMoodEmoji = Object.fromEntries(
    Object.entries(moodEmojiToNumber).map(([emoji, number]) => [number as number, emoji as string])
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

  console.log('user logged in', localStorage.getItem("user"));
  





  useEffect((): void => {
    const getJournal = async () => {
      try {
        if(localStorage.getItem("user") === "Kastholm95") {
          const res = await fetch("http://localhost:3001/get/journal");
          const json = await res.json();
          setJournal(json);
          
        }
        else if(localStorage.getItem("user") === "fredWard") {
          const res = await fetch("http://localhost:3001/get/journal/fred");
          const json = await res.json();
          setJournal(json);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getJournal();
  }, []);



  const postJournal = async () => {
    let url = "";
    if(localStorage.getItem("user") === "Kastholm95") {
      url = "http://localhost:3001/post/journal";
    }
    else if(localStorage.getItem("user") === "fredWard") {
      url = "http://localhost:3001/post/journal/fred";
    }
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
        }),
      });
      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {
        loginStatus ? (
          <>
          <div className="bg-gray-900 text-gray-100 text-2xl p-32 m-4 rounded-lg">
        {journal.find(
          (item) => formatJournalDate(item.journalDate) === yearMonthDay
        ) ? (
          <div>
            <h1>Du har allerede skrevet dagbog i dag</h1>
            <p>
              Fundet dagbog for:{" "}
              {formatJournalDate(
                journal.find(
                  (item) => formatJournalDate(item.journalDate) === yearMonthDay
                ).journalDate
              )}
            </p>
            <p>I dag er: {yearMonthDay}</p>
          </div>
        ) : (
          <div className="bg-gray-900 text-gray-100 mb-4 p-4">
        <h1 className="text-2xl mb-6 text-center">Skriv dagens dagbog</h1>
        <h2 className="text-xl mb-6 text-center">
          I dag er{" "}
          {`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}
        </h2>

        <div className="mb-12">
          <h2 className="text-xl mb-4 text-center">Sleep Board</h2>
          <div className="flex space-x-3 mb-6 justify-center ">
            {Object.entries(sleepEmojiToNumber).map(([emoji, number]) => (
              <label key={emoji} className="text-5xl cursor-pointer">
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
            ))}
          </div>

          <div className="flex justify-between w-full max-w-xs my-4">
            <div>
              <label
                htmlFor="bedTime"
                className="block text-sm font-medium text-gray-100"
              >
                Bed Time:
              </label>
              <input
                type="time"
                id="bedTime"
                name="bedTime"
                className="mt-1 p-2 rounded bg-gray-600 text-gray-100"
                onChange={(e) => setBedTime(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="wakeUpTime"
                className="block text-sm font-medium text-gray-100"
              >
                Wake Up Time:
              </label>
              <input
                type="time"
                id="wakeUpTime"
                name="wakeUpTime"
                className="mt-1 p-2 rounded bg-gray-600 text-gray-100"
                onChange={(e) => setWakeUpTime(e.target.value)}
              />
            </div>
          </div>

          <textarea
            placeholder="Any particular reason?..."
            onChange={(e) => setSleepNote(e.target.value)}
            name="reason"
            className="w-full p-2 rounded text-gray-100 bg-gray-600"
            rows="5"
            value={sleepNote}
          ></textarea>
        </div>

        <div className="mb-12">
          <h2 className="text-xl mb-4 text-center">MoodBoard</h2>
          <div className="flex space-x-3 justify-center ">
            {Object.entries(moodEmojiToNumber).map(([emoji, number]) => (
              <label key={emoji} className="text-5xl cursor-pointer">
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
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl mb-4 text-center">
            Mood Note Free journaling - a space to reflect on your thoughts
          </h2>
          <textarea
            placeholder="Type here..."
            onChange={(e) => setMoodNote(e.target.value)}
            className="w-full p-2 rounded text-gray-100 bg-gray-600"
            rows="10"
          ></textarea>
        </div>

        <div className="mb-12">
          <h2 className="text-xl mb-4 text-center">
            What have I learned today?
          </h2>
          <textarea
            placeholder="Type here..."
            onChange={(e) => setJournalNote(e.target.value)}
            className="w-full p-2 rounded text-gray-100 bg-gray-600"
            rows="10"
          ></textarea>
        </div>

        <div className="mb-12">
          <h2 className="text-xl mb-4 text-center">
            2 things you are grateful for today? / 2 things to tell your future
            self
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
            <input
              type="text"
              placeholder="Something grateful..."
              onChange={(e) => setFirstGratitude(e.target.value)}
              className="w-3/4 h-12 p-2 rounded bg-gray-600 text-gray-100"
            />
            <input
              type="text"
              placeholder="Another thing..."
              onChange={(e) => setSecondGratitude(e.target.value)}
              className="w-3/4 h-12 p-2 rounded bg-gray-600 text-gray-100"
            />
          </div>
        </div>
        <button onClick={postJournal} className=" scale-110">
          Post
        </button>
      </div>
        )}
      </div>

      <div className="p-4">
  {journal.map((item) => (
    <div key={item.id} className="bg-gray-900 text-gray-800 my-4 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">
        Dato: {new Date(item.journalDate).toLocaleDateString()}
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-700 text-gray-100 p-4 rounded">
          <p className="text-lg"><span className="font-bold text-4xl">{numberToSleepEmoji[item.sleepScore]}</span></p>
          <p className="text-lg mt-2">Seng: <span className="font-bold">{item.bedTime}</span></p>
          <p className="text-lg">Vågnet: <span className="font-bold">{item.wakeUpTime}</span></p>
          <p className="text-lg mt-4">Søvnnoter: <br /><span className="italic">{item.sleepNote}</span></p>
        </div>
        <div className="bg-gray-700 text-gray-100 p-4 rounded">
          <p className="text-lg"><span className="font-bold text-4xl">{numberToMoodEmoji[item.moodScore]}</span></p>
          <p className="text-lg mt-2">Taknemmelighed 1: <span className="italic">{item.firstGratitude}</span></p>
          <p className="text-lg">Taknemmelighed 2: <span className="italic">{item.secondGratitude}</span></p>
          <p className="text-lg mt-4">Dagbog: <br /> <span className="italic">{item.moodNote}</span></p>
          <p className="text-lg mt-4">Lært: <br /> <span className="italic">{item.journalNote}</span></p>
        </div>
      </div>
    </div>
  ))}
</div>
          </>


        ) : (<LoginForm />)
      }

     





    </div>
  );
}

export default Notebook;
