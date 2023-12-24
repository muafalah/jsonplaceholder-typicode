import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Image } from "antd";
import Table, { ColumnsType } from "antd/es/table";

import { fetchPhotosByAlbumId } from "../../utils/http";
import { PhotoType } from "../../utils/type";
import LoadingScreen from "../UI/LoadingScreen";

const PhotoTable = () => {
  const { albumId } = useParams();

  // Fetch Photos By AlbumId
  const { data: dataPhotos, isLoading: isLoadingPhotos } = useQuery({
    queryKey: ["photos", { albumId: albumId }],
    queryFn: ({ signal }) =>
      fetchPhotosByAlbumId({ signal: signal, albumId: albumId }),
    enabled: albumId !== null,
  });

  if (isLoadingPhotos) {
    return <LoadingScreen />;
  }

  if (dataPhotos) {
    const columns: ColumnsType<PhotoType> = [
      {
        title: "Image",
        dataIndex: "thumbnailUrl",
        width: 100,
        render: (text, record) => {
          return (
            <Image
              width={100}
              src={text}
              preview={{
                src: record.url,
              }}
            />
          );
        },
      },
      {
        title: "Title",
        dataIndex: "title",
        sorter: (a, b) => a.title.localeCompare(b.title),
      },
    ];

    return (
      <div
        style={{
          overflowX: "scroll",
          overflowY: "hidden",
        }}
      >
        <Table rowKey="id" columns={columns} dataSource={dataPhotos} bordered />
      </div>
    );
  }
};

export default PhotoTable;
