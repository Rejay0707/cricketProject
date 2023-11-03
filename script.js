'use strict';
async function team1() {
  async function teamData() {
    let response = await fetch('./team.json');
    return response.json();
  }
  const responseData = await teamData();
  console.log(responseData);
  ////////data[2] is to get the second data from the response
  const info = responseData.data[2];
  console.log(info);
  ////////data[2].name is to get the country name from the response
  const name = responseData.data[2].name;
  console.log(name);
  ////////data[2].genericFlag is to get the country flag from the response
  const flag = responseData.data[2].genericFlag;
  console.log(flag);
  document.getElementById(
    'details-con'
  ).innerHTML = `<h1>${name}</h1><br><img src=${flag}/>`;
}
async function players1() {
  //// we are giving style.display='none' because when we click  the players button, team details should not be there
  document.getElementById('details-con').style.display = 'none';
  async function playersData() {
    let response = await fetch('./match-1-info.json');
    return response.json();
  }
  const responseData = await playersData();
  let a = responseData;
  //   console.log(a);
  let b = a.data[1].players;
  //   console.log(b);
  b.forEach(async (data) => {
    let teamPlayers = document.getElementById('players-de-con');
    const { playerImg, name, country, id } = data;
    let playersDetails = document.createElement('div');
    playersDetails.setAttribute('class', 'playersDetails');
    playersDetails.innerHTML = `<img src=${playerImg}><h1>${name}</h1><h1>${country}</h1><button class="viewDetails" >View Details</button>`;
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

            let PlayerId = info1.find((c) => c.id === id);
            const {
              playerImg,
              name,
              country,
              dateOfBirth,
              role,
              battingStyle,
              bowlingStyle,
            } = PlayerId;
            console.log(PlayerId);

            let overlay = document.querySelector('.overlay');
            overlay.style.display = 'block';

            let popUp = document.querySelector('.pop-up');

            popUp.innerHTML = `<br><img src=${playerImg}><h1>${name}</h1><h1>${country}</h1><h1>${dateOfBirth}</h1><h1>${role}</h1><h1>${battingStyle}</h1><h1>${bowlingStyle}</h1><button class="popup-close" >&times;</button>`;
            const closeButton = document.querySelector('.popup-close');
            closeButton.addEventListener('click', () => {
              let popUp = document.querySelector('.pop-up');
              let overlay = document.querySelector('.overlay');
              popUp.style.display = 'none';
              overlay.style.display = 'none';
            });
          }
        });
    });

    // viewDetails.addEventListener('click', (b) => {
    //   b.preventDefault();
    //   fetch('./match-1-info')
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (data.status === 'success') {
    //         let teamData = data.data;
    //         let findTeam = teamData.find((b) => b.teamName === 'South Africa');
    //         console.log(findTeam);
    //       }
    //     });
    // });
    // console.log(palyersInfo);
    teamPlayers.appendChild(playersDetails);
  });
  //   async function palyersInfo() {
  //     let viewDetails = document.getElementById('players-info-con');
  //     let response = await fetch('./match-1-info.json');
  //     return response.json();
  //   }
  //   const responseData1 = await playersData();
  //   // console.log(responseData1);
  //   let c = responseData1;
  //   // console.log(c);
  //   let d = c.data[1];
  //   console.log(d);
  //   let e = d.players.id;
  //   console.log(e);

  //   let playersInfo = document.createElement('div');
  //   playersInfo.setAttribute('class', 'playersInfo');
  //   playersInfo.innerHTML = ``;
}
////////////
async function Matches() {
  document.getElementById('players-de-con').style.display = 'none';
  async function matchData() {
    const response = await fetch('./series-info.json');
    return response.json();
  }

  //   let match1 = document.getElementById('matches-de-con');
  const responseData2 = await matchData();
  console.log(responseData2);
  let a = responseData2.data;
  console.log(a);
  const matches = a.matchList;
  console.log(matches);
  const southAfricaMatches = matches.filter((match) =>
    match.teams.includes('South Africa')
  );

  console.log(southAfricaMatches);
  southAfricaMatches.forEach((data) => {
    let match1 = document.getElementById('matches-de-con');
    const {
      name,
      date,
      dateTimeGMT,
      venue,
      matchType,
      matchStarted,
      matchEnded,
      status,
    } = data;
    let matchInfo = document.createElement('div');
    matchInfo.setAttribute('class', 'matchInfo');
    matchInfo.innerHTML = `<br><h3><u>ICC CRICKET WORLD CUP-2023(matches for south africa)</u></h3><br><h1>${name}</h1><h2>Date:${date}</h2><h2>Time:${dateTimeGMT}</h2><h2>Venue:${venue}</h2><h2>Match Started:${matchStarted}</h2><h2>Match Ended:${matchEnded}</h2><h2>Match Type:${matchType}</h2><h2>Status:${status}</h2>`;
    match1.appendChild(matchInfo);
  });

  //   const name1 = southAfricaMatches[1].name;
  //   console.log(name1);
  //   let match1 = document.getElementById('matches-de-con');
  //   console.log(match1);

  //   console.log(southAfricaMatches);

  //   console.log(matchInfo);

  //   let a = responseData2;
}
