<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Config;
use App\Http\Requests;
use App\Models\Enquiry;
use DB;
use \Setting;
use Illuminate\Support\Facades\Validator;
use Exception;

class EnquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {  
		return $this->post($request);
    }
	


	protected function post(Request $request)
	{
		$validator =Validator::make($request->all(), [             
				'name'		=> 'required|string|max:150',
				'email'		=> 'required|email|max:150',
				'mobile' 	=> 'required|string|max:15',
				'message' 	=> 'required|string|max:5000',
		]
		);

		if (!$validator->fails())
		{
			try {
				$req_type = 1;
				
				Enquiry::create([
					'first_name' => $request->name,
					'email' => $request->email,
					'mobile_number' => $request->mobile,
					'phone_number' => $request->mobile,
					'message' => $request->message,
					'type'	=>	$req_type
				]);
				
				return response()->json([
					'message' => 'Enquiry has bees successfully posted',
					'success'=>"true",
				]);
				
				
			} catch (Exception $e) {
				return response()->json([
					'message' => $e->getMessage(),
					'success'=>"false",
				]);
			}
		}else{
			$errors = $validator->errors();

			return response()->json([
				'status' => 'false',
				'error' => $errors->messages(),
			], 422);
		}
		
		

	}
}