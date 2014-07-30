<?php
/* 
 * This class is used for logging purposes
 * It also contains useful user functions, to get ip for example
 *
 * Written by: Alejandro U Alvarez http://urbanoalvarez.es
 * Last Updated: March 21, 2008
 *
 */

class Logs
{
	//init of class update Logs
	
	//Function send mail, notifies an admin of log changes.

	function newLog($msg){
		$from = 'From: <'.EMAIL_FROM_ADDR.'>';
		$subject = 'Log of '.SITE_NAME.' changed';
		$body = 'The log of '.SITE_NAME.' has changed:\n'. $msg.'\n Hi, '.EMAIL_FROM_ADDR;
		return mail(EMAIL_TO_ADDR,$subject,$body,$from);
	}
	
	//the following function will log any activity in the pages with the code "$log->logg(parameters);" in them:
	function logg($page=1,$msg=1,$priority='notSet',$color='blue',$mail='no'){
		if($page == 1 || $msg == 1){
			if($page == 1){
				$page = $_SERVER['PHP_SELF']; //get full page direction (Ej. /index.php
				$pages = explode('/',$page); //explode the / and take 1 (Only suitable for first level pages)
				$name = explode('.',$pages[1]); //explode the .php, and leave only the "name" ($name[0])
				$page = $name[0]; //Now the page name is in the form of "log" for the page "/log.php"
			}
			//Use the following arrays to store the default pages:
			//
			$high = array('log'); //for the example the important page is log.php
			$medium = array('test'); //for the example the medium is test.php
			//
			if($priority == 'notSet'){ //If priority was left blank
				//Now perform the check to see if page is important:
				if(in_array($page,$high)){
					$priority = 'High';
					$color = 'red';
				}else if(in_array($page,$medium)){
					$priority = 'Medium';
					$color = 'yellow';
				}else{
					$priority = 'Low';
				}
			}
			if($msg == 1){ //This are the default messages to use when no arguments are given.
				$msg = 'Access allowed to page '.$page;
			}
			//
		}
		if($mail=='yes'){
			$this->newLog($msg);
		}
		return $this->addLog($msg,time(),$priority,$color);
	}
	function addLog($msg,$timetamp,$priority,$class){
		global $database;
        /**
         * Inserting data
         */
//The fields and values to insert
        $names = array(
            'id' => "",
            'msg' => $msg,
            'user'=> "movil app",
            'timestamp'=>    $timetamp,
            'ip'=>"",
            'priority'=> $priority,
            'class'=> $class
        );
        $add_query = $database->insert( TBL_LOG, $names );
        if( $add_query )
            return true;
        else
          return false;

	}



};


