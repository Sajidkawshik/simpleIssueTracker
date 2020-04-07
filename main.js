document.getElementById('issueInputForm').addEventListener('submit', submitIssue);


function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';
  const buttonStatus = 'enabled';

  const issue = { id, description, severity, assignedTo, status, buttonStatus };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}




const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  console.log(id);
  const currentIssue = issues.find(issue => issue.id == id);
  console.log(currentIssue);
  currentIssue.status = 'Closed';
  const solvedIssues = document.getElementById("solvedIssues").innerText;
  const solvedIssuesNum = parseFloat(solvedIssues);
  const currentSolvedIssues = solvedIssuesNum + 1;
  const currentSolvedIssuesNum = parseFloat(currentSolvedIssues);
  document.getElementById("solvedIssues").innerText = currentSolvedIssues;

  const description = currentIssue.description;
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  

}


const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));  
  const remainingIssues = issues.filter( issue=> issue.id != id )  
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  console.log(issues);
  fetchIssues();

}



const fetchIssues = () => {
 
  const totalIssues = JSON.parse(localStorage.getItem('issues')).length;   
  const totalIssuesNum = parseFloat(totalIssues);
  const currentTotalIssue = totalIssuesNum + 0;
  const currentTotalIssueNum = parseFloat(currentTotalIssue);
  document.getElementById("totalIssues").innerText = currentTotalIssue;
  const issuess = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issuess.filter(issue => issue.status == "Closed").length;
  

  document.getElementById("solvedIssues").innerText = currentIssue ; 

  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status} = issues[i];
    if (issues[i].status == "Open") {
      issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 ><span id="description"> ${description} </span> </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <button id = "clsBtn" onclick="closeIssue(${id})" class="btn btn-warning">Close</button>
                              <button onclick="deleteIssue(${id})" class="btn btn-danger" id ="dltBtn">Delete</button>
                              
                              
                              </div>`;
    }

    else {
      issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 ><span id="description"> ${description} </span> </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                             
                              <button onclick="deleteIssue(${id})" class="btn btn-danger" id ="dltBtn">Delete</button>
                              
    
                              </div>`;
    }
  }
}


