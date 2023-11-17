'use strict';
document.getElementById('teams-table').style.display = 'none';
async function team1() {
  document.getElementById('team-de-con').style.display = 'none';
  document.getElementById('team1-de-con').style.display = 'none';
  document.getElementById('players-de-con').style.display = 'none';
  document.getElementById('teams-table').style.display = 'none';
  document.getElementById('matches-de-con').style.display = 'none';

  document.getElementById('details-con').style.display = 'block';
  document.getElementById('home-con').style.display = 'none';
  async function teamData() {
    let response = await fetch('./team.json');
    return response.json();
  }
  const responseData = await teamData();
  console.log(responseData);

  const info = responseData.data[2];
  console.log(info);

  const name = responseData.data[2].name;
  console.log(name);

  const flag = responseData.data[2].genericFlag;
  console.log(flag);
  document.getElementById(
    'details-con'
  ).innerHTML = `<h1>${name}</h1><br><img src=${flag}/>`;
}
let popUp = document.querySelector('.pop-up');
let overlay = document.querySelector('.overlay');
//////////////////////////////////////////////
async function players1() {
  document.getElementById('home-con').style.display = 'none';
  document.getElementById('details-con').style.display = 'none';
  document.getElementById('teams-table').style.display = 'none';
  document.getElementById('matches-de-con').style.display = 'none';
  document.getElementById('team-de-con').style.display = 'none';
  document.getElementById('team1-de-con').style.display = 'none';
  document.getElementById('players-de-con').style.display = 'grid';

  async function playersData() {
    let response = await fetch('./match-1-info.json');
    return response.json();
  }
  const responseData = await playersData();
  let a = responseData;
  console.log(a);
  let b = a.data[1].players;
  console.log(b);
  b.forEach(async (data) => {
    let teamPlayers = document.getElementById('players-de-con');
    const { playerImg, name, country, id } = data;
    console.log(data);
    let playersDetails = document.createElement('div');
    playersDetails.setAttribute('class', 'playersDetails');
    playersDetails.innerHTML = `<img src=${playerImg}><h1>${name}</h1><h1>${country}</h1><a class="viewDetails" >View Details</a>`;
    console.log(playersDetails);
    const viewdetails = playersDetails.querySelector('.viewDetails');

    viewdetails.addEventListener('click', (s) => {
      s.preventDefault;
      fetch('./match-1-info.json')
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            let info = data.data.find((b) => b.teamName === 'South Africa');
            let info1 = info.players;
            console.log(info1);

            let PlayerId = info1.find((c) => c.id === id);
            const {
              playerImg,

              name,
              country,

              role,
              battingStyle,
              bowlingStyle,
            } = PlayerId;
            console.log(PlayerId);

            let overlay = document.querySelector('.overlay');
            overlay.style.display = 'block';

            let popUp = document.querySelector('.pop-up');
            popUp.style.display = 'block';

            popUp.innerHTML = `<br><img src=${playerImg}><h1>Name:${name}</h1><h1>${country}</h1><h1>Role:${role}</h1><h1>Batting Style:${battingStyle}</h1><h1>Bowling Style:${bowlingStyle}</h1><button class="popup-close" >&times;</button>`;
            const closeButton = document.querySelector('.popup-close');
            closeButton.addEventListener('click', () => {
              popUp.style.display = 'none';
              overlay.style.display = 'none';
            });
          }
        });
    });

    teamPlayers.appendChild(playersDetails);
  });
}

//////////////////////////
async function Matches() {
  document.getElementById('home-con').style.display = 'none';
  document.getElementById('details-con').style.display = 'none';
  document.getElementById('teams-table').style.display = 'none';
  document.getElementById('players-de-con').style.display = 'none';
  document.getElementById('team-de-con').style.display = 'block';
  document.getElementById('team1-de-con').style.display = 'block';
  document.getElementById('matches-de-con').style.display = 'block';
  async function matchData() {
    const response = await fetch('./series-info.json');
    return response.json();
  }

  //   let match1 = document.getElementById('matches-de-con');
  const responseData2 = await matchData();
  // console.log(responseData2);
  let a = responseData2.data;
  // console.log(a);
  const matches = a.matchList;
  // console.log(matches);
  const southAfricaMatches = matches.filter((match) =>
    match.teams.includes('South Africa')
  );

  // console.log(southAfricaMatches);
  southAfricaMatches.forEach((data) => {
    let match1 = document.getElementById('matches-de-con');
    const {
      name,
      id,
      date,
      dateTimeGMT,
      venue,
      matchType,
      matchStarted,
      matchEnded,
      status,
    } = data;
    console.log(data.id);
    let matchInfo = document.createElement('div');
    matchInfo.setAttribute('class', 'matchInfo');
    matchInfo.innerHTML = `<br><h3><u>ICC CRICKET WORLD CUP-2023(matches for south africa)</u></h3><br><h1>${name}</h1><h2>Date:${date}</h2><h2>Time:${dateTimeGMT}</h2><h2>Venue:${venue}</h2><h2>Match Started:${matchStarted}</h2><h2>Match Ended:${matchEnded}</h2><h2>Match Type:${matchType}</h2><h2>Status:${status}</h2><button class="viewDetails1" >View Score Details</button>`;
    match1.appendChild(matchInfo);

    const scoreData = matchInfo.querySelector('.viewDetails1');
    scoreData.addEventListener('click', () => {
      document.getElementById('matches-de-con').style.display = 'none';
      // document.getElementById('score-players-de').style.display = 'block';

      fetch('./score.json')
        .then((response) => response.json())
        .then((d) => {
          let a = d.data;
          console.log(a);
          let scoreData3 = a.score[0];
          console.log(scoreData3);
          let toSc = scoreData3.r;

          let inningsId = document.getElementById('score-players-de');

          let innings = scoreData3.inning;
          console.log(innings);

          let scoreData4 = a.scorecard[0];
          console.log(scoreData4);
          let extra = scoreData4.extras;
          console.log(extra);
          let ex = extra.r;
          console.log(ex);

          let batting1 = scoreData4.batting;
          console.log(batting1);

          let teaminfo = document.getElementById('team-de-con');

          teaminfo.innerHTML = `<h1>${scoreData3.inning}</h1>

          
          <table 
          <h1 id="innings-con"></h1>
          <thead>
            <tr>

              <th>Batter</th>
              <th>Dismissal</th>
              <th>Runs</th>
              <th>Ball Faced</th>
              <th>4s</th>
              <th>6s</th>
              <th>Strike Rate</th>
            </tr>
          </thead>
          <tbody></tbody>

        </div>
        </div>`;

          batting1.forEach((data) => {
            const bat = data.batsman.name;
            // console.log(bat);
            const dis = data['dismissal-text'];
            // console.log(dis);
            const run = data.r;
            // console.log(run);
            const ball = data.b;
            // console.log(ball);
            const four = data['4s'];
            // console.log(four);
            const six = data['6s'];
            // console.log(six);
            const strikeRate = data.sr;
            console.log(strikeRate);

            let scoreTableInfo1 = document.createElement('tr');
            scoreTableInfo1.setAttribute('class', 'scoreTableInfo1');
            scoreTableInfo1.innerHTML = `<td>${bat}</td><td>${dis}</td><td>${run}</td><td>${ball}</td><td>${four}</td><td>${six}</td><td>${strikeRate}</td>`;
            teaminfo.appendChild(scoreTableInfo1);
          });
          let dataex = teaminfo;
          let extraScore = document.createElement('tr');
          extraScore.innerHTML = `<tr>Extras:${ex}</tr>&nbsp&nbsp<tr>Total Score:${toSc}</tr>`;
          dataex.appendChild(extraScore);

          let team1Data = a;
          console.log(team1Data);
          let team1ToScore = team1Data.score[1];
          console.log(team1ToScore);
          let totSc = team1ToScore.r;
          let team1Sorecard = team1Data.scorecard[1];
          console.log(team1Sorecard);
          let extraDa = team1Sorecard.extras;
          console.log(extraDa);
          let ex2 = extraDa.r;
          console.log(ex2);

          let batting2 = team1Sorecard.batting;
          console.log(batting2);

          const teamData = document.getElementById('team1-de-con');
          teamData.innerHTML = `<h1><br>${team1ToScore.inning}</h1>
            <table id="table-1">
            <h1 id="innings-1-con"></h1>
            <thead>
              <tr>

                <th>Batter</th>
                <th>Dismissal</th>
                <th>Runs</th>
                <th>Ball Faced</th>
                <th>4s</th>
                <th>6s</th>
                <th>Strike Rate</th>
              </tr>
            </thead>
            <tbody></tbody>

          </div>
          </div>`;

          batting2.forEach((data) => {
            const bat1 = data.batsman.name;
            console.log(bat1);
            const dis1 = data['dismissal-text'];
            // console.log(dis);
            const run1 = data.r;
            // // console.log(run);
            const ball1 = data.b;
            // // console.log(ball);
            const four1 = data['4s'];
            // // console.log(four);
            const six1 = data['6s'];
            // // console.log(six);
            const strikeRate1 = data.sr;
            // console.log(strikeRate);
            let scoreTableInfo2 = document.createElement('tr');
            scoreTableInfo2.setAttribute('class', 'scoreTableInfo1');
            scoreTableInfo2.innerHTML = `<td>${bat1}</td><td>${dis1}</td><td>${run1}</td><td>${ball1}</td><td>${four1}</td><td>${six1}</td><td>${strikeRate1}</td>`;
            teamData.appendChild(scoreTableInfo2);
          });
          let ex3 = teamData;
          let extraScore1 = document.createElement('tr');
          extraScore1.innerHTML = `<tr>Extras:${ex2}</tr>&nbsp&nbsp<tr>Total Score:${totSc}</tr>`;
          ex3.appendChild(extraScore1);
        });
    });
  });
}

////////////////////////////////
async function table() {
  document.getElementById('home-con').style.display = 'none';
  document.getElementById('matches-de-con').style.display = 'none';
  document.getElementById('team-de-con').style.display = 'none';
  document.getElementById('team1-de-con').style.display = 'none';
  document.getElementById('players-de-con').style.display = 'none';
  document.getElementById('details-con').style.display = 'none';
  document.getElementById('teams-table').style.display = 'block';
  let o = popUp;
  // o.style.display = 'none';
  async function tableData() {
    const response = await fetch('./pointsTable.json');
    return response.json();
  }

  const responseData3 = await tableData();
  console.log(responseData3);

  const teamData = responseData3;

  let data = teamData.data.sort((a, b) => b.wins - a.wins);
  let tableData1 = data;
  tableData1.forEach((data) => {
    const tableInfo = document.getElementById('teams-table');
    const { teamname, shortname, matches, wins, loss, ties, nr } = data;
    console.log(data);
    let tableInfo1 = document.createElement('tr');
    tableInfo1.setAttribute('class', 'tableInfo1');
    tableInfo1.innerHTML = `
    <td>${teamname}</td><td>${shortname}</td><td>${matches}</td><td>${wins}</td><td>${loss}</td><td>${ties}</td><td>${nr}</td>`;
    tableInfo.appendChild(tableInfo1);
  });
}
