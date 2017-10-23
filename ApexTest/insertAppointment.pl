#!C:\Perl64\bin\perl.exe -wT

print "Content-type : text/json\n\n";
use DBI;
use strict;
use CGI;

my $driver="SQLite";
my $database="ApexDB.db";
my $dsn="DBI:$driver:dbname=$database";
my $userid="";
my $password="";

#make db connection
my $con = DBI -> connect($dsn,$userid,$password,{RaiseError=>1}) or die $DBI::errstr;


my $cgi = new CGI;

#store form fields input value
my $date = $cgi->param('txtDate');
my $time = $cgi->param('txtTime');
my $description = $cgi->param('txtDescription');

# Creating appointment table if it does not exist
$con->do("CREATE TABLE IF NOT EXISTS Appointment(datetime TEXT,description TEXT)");
	

#insert data to Appointment table
my $stmh= $con -> prepare("insert into Appointment(datetime, description) values (?,?);");

#execute insert statement and combine date and time
$stmh->execute($date." ".$time, $description) or die $DBI::errstr;

$con->disconnect();

#auto redirect after add button is clicked
my $url="http://localhost/ApextTest/index.html";
my $t=0; # time until redirect activates

print "<META HTTP-EQUIV=refresh CONTENT=\"$t;URL=$url\">\n";