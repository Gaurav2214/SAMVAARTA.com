<?php
namespace App\Helpers;

use Exception;


class Helpers{

    public static function send_mail($param){			
        	try{
				$subject = $param['subject'];
				$body_part = $param['body_part'];
				$type = '';

				if(isset($param['mail_type']) && $param['mail_type']== "register"){
				\Mail::send('emails.register_mail',['data'=>$param], function ($mail) use ($subject, $param) {
						//dd($param);
						$mail->from($param['from_email'], $param['from_name']);
						$mail->to($param['to_email'], $param['to_name'])->subject($subject);
					});

				}else{
					\Mail::send('emails.common_mail', ['body_part'=>$body_part], function ($mail) use ($subject, $param) {
						//dd($param);
						$mail->from($param['from_email'], $param['from_name']);
						$mail->to($param['to_email'], $param['to_name'])->subject($subject);
					});
				}
        	}catch(Exception $e){
				//dd($e->getMessage());
			}
				
				
            //return true;
        }
    

}