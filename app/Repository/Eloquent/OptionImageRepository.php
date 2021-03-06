<?php  
namespace App\Repository\Eloquent;

use App\Models\OptionImages;
use App\Repository\Interfaces\IOptionImageRepository;

class OptionImageRepository implements IOptionImageRepository
{   
    protected $optionimage = null;

    public function createOrUpdate( $collection = [], $id = null )
    {   
        if(is_null($id)) {
            $optionimage = new OptionImages;
            $optionimage->option_id = $collection['option_id'];
            $optionimage->img_name = $collection['img_name'];
            $optionimage->save();
            return $optionimage;
        }
        $optionimage = OptionImages::find($id);
        $optionimage->option_id = $collection['option_id'];
        $optionimage->img_name = $collection['img_name'];
        $optionimage->save();
        return $optionimage;
    }

    public function getOptionImageByOptionId($optId) {
        $data = OptionImages::where('option_id', '=', $optId)->first();

        return $data;
    }

    public function getOptionImagesByOptionId($optId) {
        $data = OptionImages::where('option_id', '=', $optId)->get();

        return $data;
    }
}
?>