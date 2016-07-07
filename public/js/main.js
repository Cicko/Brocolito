const $ = require("jquery");

const scoresTemplate = `
<div class="container">
  <h2>Best Scores</h2>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Points</th>
        <th>UserName</th>
      </tr>
    </thead>
    <tbody>
    <% _.each(rows, (row) => { %>
      <tr>
        <td>row.maxpoints</td>
        <td>row.username</td>
      </tr>
    <% }); %>
    </tbody>
  </table>
</div>
`;

var query;

function setQuery (qry) {
  query = qry;
}

/* Dump the table result into the HTML */
const fillTable = () => {
  $("#scoresTable").html(_.template(scoresTemplate, { rows: query }));
};

$(document).ready(function() {

  fillTable();

  $("#start").click (() => {
    console.log("Entrando en start");
    $.get("/start");
  });

});
