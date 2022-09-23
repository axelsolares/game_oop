export default {
    isColision(element1, element2){
        let mesh1 = element1.getColisionMesh();
        let mesh2 = element2.getColisionMesh();

        if((mesh1.x1 > mesh2.x1 && mesh1.x1 < mesh2.x2 || mesh1.x2 > mesh2.x1 && mesh1.x2 < mesh2.x2)
        && (mesh1.y1 > mesh2.y1 && mesh1.y1 < mesh2.y2 || mesh1.y2 > mesh2.y1 && mesh1.y2 < mesh2.y2)){
            return true;
        }

        if((mesh2.x1 > mesh1.x1 && mesh2.x1 < mesh1.x2 || mesh2.x2 > mesh1.x1 && mesh2.x2 < mesh1.x2)
        && (mesh2.y1 > mesh1.y1 && mesh2.y1 < mesh1.y2 || mesh2.y2 > mesh1.y1 && mesh2.y2 < mesh1.y2)){
            return true;
        }

        return false;
    }
}