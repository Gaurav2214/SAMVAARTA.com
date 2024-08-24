<?php

namespace App\Http\Controllers\Resource;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Route;
use Exception;

use App\User;
use App\Models\TrainerLearnerMapping;
use App\Models\LearningObjectiveTypes;

class CommonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function __construct(Request $request)
	{		
	}

    public function learning_objective_types()
    {
        $LearningObjectiveTypes = LearningObjectiveTypes::where(['status'=>'1'])->orderBy('objective_type', 'ASC')->get();
        return response()->json(['success' =>'true','data'=>$LearningObjectiveTypes,'count'=>count($LearningObjectiveTypes)]);
    }

}