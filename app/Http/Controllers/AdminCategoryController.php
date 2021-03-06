<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\http\Requests\CategoryRequest;
use App\Repository\Interfaces\IDepartmentRepository;
use App\Repository\Interfaces\ICategoryRepository;

class AdminCategoryController extends Controller
{
    public $category, $department;

	public function __construct(ICategoryRepository $category, IDepartmentRepository $department) {
        $this->category = $category;
        $this->department = $department;
    }

    function index() {
    	$categorylist = $this->category->getAllCategories();
    	return view('admin.catalog.category.index', ['categorylist' => $categorylist]);
    }

    function add() {
    	$departmentlist = $this->department->getAllDepartments();
    	return view('admin.catalog.category.add', ['departmentlist' => $departmentlist]);
    }

    function addCategory(CategoryRequest $req) {
    	$result = $this->category->createOrUpdate(NULL, array('title' => $req->title, 'department_id' => $req->department_id));
    	return redirect()->route('admincategory.index');
    }

	function edit($cid) {
		$result = $this->category->getCategoryById($cid);
        $departmentlist = $this->department->getAllDepartments();
    	return view('admin.catalog.category.edit',['category' => $result, 'departmentlist' => $departmentlist]);
    }

    function editCategory($cid, CategoryRequest $req) {
    	$result = $this->category->createOrUpdate($cid, array('title' => $req->title, 'department_id' => $req->department_id));
    	return redirect()->route('admincategory.index');
    }

    function categoryByDepartment(Request $req) {
        if($req->department_id){
            $result = $this->category->categoryByDepartment($req->department_id);
            if(count($result) >=1){
                echo '<option value="">Select Category</option>';
                foreach($result as $key => $value){ 
                    echo '<option value="'.$value->id.'">'.$value->title.'</option>';
                }
            }
            else {
                echo '<option value="">No Category</option>';
            }
        }
    }

    function checkDuplicate(Request $req) {
        $name = $req->name;
        $did =  $req->did;
        if (isset($this->category->checkDuplicate($name, $did)->id)) {
            return "Has Duplicate";
        }
        else {
            return "No Duplicate";
        }
    }
}
