import React from "react";

function Notebook() {
  return (
    <div>
      Notebook
      {/* <div className="flex space-x-3 mb-4 p-4 bg-red-200">
      <h1 className="font-bold text-2xl">Overall Statistics</h1>
        <p>Humør smiley</p>
        <select name="smiley" value="ad" id="">
          <option value="Alle">Alle</option>
          <option value="Glad">Glad</option>
          <option value="Okay">Okay</option>
          <option value="Sad">Sad</option>
        </select>
        <input type="text" value="dato fra" />
        <input type="text" value="dato til" />
        <p>Søvn smiley</p>
        <select name="sleep" id="">
          <option value="Alle">Alle</option>
          <option value="God">God</option>
          <option value="Okay">Okay</option>
          <option value="Dårlig">Dårlig</option>
        </select>
        <button className="bg-green-200 p-2">Filtrer</button>
      </div>
      <div className="bg-yellow-200 flex space-x-3 mb-4 p-4">
        <h1 className="font-bold text-2xl">Yearly Statistics</h1>
        <p>Humør smiley</p>
        <select name="smiley" value="ad" id="">
          <option value="Alle">Alle</option>
          <option value="Glad">Glad</option>
          <option value="Okay">Okay</option>
          <option value="Sad">Sad</option>
        </select>
        <input type="text" value="dato fra" />
        <input type="text" value="dato til" />
        <p>Søvn smiley</p>
        <select name="sleep" id="">
          <option value="Alle">Alle</option>
          <option value="God">God</option>
          <option value="Okay">Okay</option>
          <option value="Dårlig">Dårlig</option>
        </select>
        <button className="bg-green-200 p-2">Filtrer</button>
      </div> */}
       <div className="bg-blue-200 p-12 mb-4">

                  <h1 className="font-bold text-4xl mb-4">Filter</h1>

             <div className="flex space-x-3 ">
                  <p>Humør smiley</p>
                  <select name="smiley" value="ad" id="">
                    <option value="Alle">Alle</option>
                    <option value="Glad">Glad</option>
                    <option value="Okay">Okay</option>
                    <option value="Sad">Sad</option>
                  </select>
                  <input type="text" value="dato fra" />
                  <input type="text" value="dato til" />
                  <p>Søvn smiley</p>
                  <select name="sleep" id="">
                    <option value="Alle">Alle</option>
                    <option value="God">God</option>
                    <option value="Okay">Okay</option>
                    <option value="Dårlig">Dårlig</option>
                  </select>
                  <button className="bg-green-200 p-2">Filtrer</button>
             </div>

             <div className="mb-12">
          <h1 className="text-4xl my-4">Sleep Board</h1>
             <div className="flex space-x-3 mb-6  justify-center ">
                  <h1 className="text-5xl">🤩 : 0</h1>
                  <h1 className="text-5xl">🙂 : 0</h1>
                  <h1 className="text-5xl">🥱 : 0</h1>
                  <h1 className="text-5xl">😫 : 0</h1>
             </div>
        </div>
          <h1 className="text-4xl mb-4">MoodBoard</h1>
             <div className="flex space-x-3  justify-center ">
                  <h1 className="text-5xl">😁 : 0</h1>
                  <h1 className="text-5xl">🙂 : 0</h1>
                  <h1 className="text-5xl">😐 : 0</h1>
                  <h1 className="text-5xl">☹️ : 0</h1>
             </div>
        
             

      <h1 className="text-4xl my-12">
          Display last 30 days Journals here <br />
          Or use Filter to display what you wish to see
      </h1>

       </div>

      <div className="bg-orange-200 mb-4 p-4">
        <div className="my-12">
        <h1 className="text-4xl mb-6">Write todays journal</h1>
          <h1 className="text-4xl mb-6">Today is 12/31/2023</h1>
        <div className="mb-12">
          <h1 className="text-4xl mb-4">Sleep Board</h1>
             <div className="flex space-x-3 mb-6  justify-center ">
                  <h1 className="text-6xl">🤩 : 1</h1>
                  <h1 className="text-6xl">🙂 : 1</h1>
                  <h1 className="text-6xl">🥱 : 1</h1>
                  <h1 className="text-6xl">😫 : 1</h1>
             </div>
             <textarea value='Any sparticular reason??...' name="reason" id="" cols="100" rows="5"></textarea>
        </div>
          <h1 className="text-4xl mb-4">MoodBoard</h1>
             <div className="flex space-x-3  justify-center ">
                  <h1 className="text-6xl">😁 : 1</h1>
                  <h1 className="text-6xl">🙂 : 1</h1>
                  <h1 className="text-6xl">😐 : 1</h1>
                  <h1 className="text-6xl">☹️ : 1</h1>
             </div>
        </div>
        <div className="my-12">
          <h1 className="text-4xl mb-4">Free journaling - a space to reflect on your thoughts</h1>
             <div className="flex space-x-3  justify-center ">
             <textarea value='type here.....'  rows="10" cols="100"></textarea>
             </div>
        </div>
        <div className="my-12">
          <h1 className="text-4xl mb-4">What have i learned today?</h1>
             <div className="flex space-x-3  justify-center ">
             <textarea value='type here.....'  rows="10" cols="100"></textarea>
             </div>
        </div>
        <div className="my-12 grid place-content-center gap-2">
          <h1 className="text-4xl mb-4">2 things you are grateful for today? / 2 things to tell your future self</h1>
             <input type="text" className="h-12" /><input type="text" className="h-12" />
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default Notebook;
