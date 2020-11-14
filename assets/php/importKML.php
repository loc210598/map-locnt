<?php
    require_once('connectd.php');
    //$file_name = 'testImport.kml';
    $file_name = $_POST['inputFile'];
    if ($file_name == '') {
        echo "<script>alert('Nhaapj file trc');</script>";
    } else {
        $file = file_get_contents($file_name);
        $xmldata = simplexml_load_string($file);

        $placemarks = $xmldata->Document->Placemark;
        for ($i = 0; $i < count($placemarks); $i++) {
            $coordinates = $placemarks[$i]->coordinates;
            $coord = $placemarks[$i]->Point->coordinates;
            $name = $placemarks[$i]->name;
            $coords = explode(",",$coord, 1);
            $coordstr = implode(',', $coords);

            $sql = "INSERT INTO addbeer (TenDiaDiem, ToaDo) VALUES ('$name','$coord')";

            mysqli_query($connect,$sql);

        }
}
?>
