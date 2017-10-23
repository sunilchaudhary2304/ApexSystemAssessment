#!C:\Perl64\bin\perl.exe -wT
print "Content-type : text/json\n\n";
use strict;
use CGI;
use DBI;
use JSON;

my $cgi = new CGI;

my $driver="SQLite";
my $database="ApexDB.db";
my $dsn="DBI:$driver:dbname=$database";
my $userid="";
my $password="";

#make db connection
my $con = DBI -> connect($dsn,$userid,$password,{RaiseError=>1});

my @output;

#store search text value
my $txtSearch = $cgi->param('searchData');
 
#fetch data from the database
my $query;
my $query_handle ;
if($txtSearch){
	$query = qq(select  datetime,description from Appointment where description like ? );
	 $query_handle = $con->prepare($query);
	 $query_handle->execute($txtSearch.'%') or die $DBI::errstr;
}
else{
$query = qq(select  datetime,description from Appointment );
 $query_handle = $con->prepare($query);
 $query_handle->execute() or die $DBI::errstr;
}

while ( my $row = $query_handle->fetchrow_hashref ){
    push @output, $row;
}

#convert to json
print to_json(\@output);

$con->disconnect();
