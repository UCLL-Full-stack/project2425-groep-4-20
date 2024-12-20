import React, { useState, useEffect } from "react";
import PlaylistService from "@services/PlaylistService";
import { Playlist } from "@types";
import Header from "@components/Header";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const AddPlaylistPage = () => {
  const { t } = useTranslation();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState<Playlist[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [userIdError, setUserIdError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await PlaylistService.getAllPlaylists();
        const playlistData = await response.json();
        setPlaylists(playlistData);
        setFilteredPlaylists(playlistData);
      } catch (error) {
        setMessage(t("addplaylist.error"));
      }
    };

    fetchPlaylists();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const filtered = playlists.filter((playlist) =>
      playlist.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPlaylists(filtered);
  };

  const clearErrors = () => {
    setTitleError(null);
    setDescriptionError(null);
    setUserIdError(null);
  };

  const validateFields = (): boolean => {
    clearErrors();
    let isValid = true;

    if (!title.trim()) {
      setTitleError(t("addplaylist.errors.titleRequired"));
      isValid = false;
    }

    if (!description.trim()) {
      setDescriptionError(t("addplaylist.errors.descriptionRequired"));
      isValid = false;
    }

    if (!userId) {
      setUserIdError(t("addplaylist.errors.userIdRequired"));
      isValid = false;
    }

    return isValid;
  };

  const handleAddPlaylist = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      const newPlaylist = await PlaylistService.addPlaylist(title, description, userId as number);

      setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
      setFilteredPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
      setMessage(t("addplaylist.success", { title: newPlaylist.title }));
      setTitle("");
      setDescription("");
      setUserId(null);
    } catch (error) {
      setMessage(t("addplaylist.error"));
    }
  };

  const handleDeletePlaylist = async (playlistId: number) => {
    try {
      await PlaylistService.deletePlaylist(playlistId);

      setPlaylists((prevPlaylists) =>
        prevPlaylists.filter((playlist) => playlist.id !== playlistId)
      );
      setFilteredPlaylists((prevPlaylists) =>
        prevPlaylists.filter((playlist) => playlist.id !== playlistId)
      );

      setMessage(t("addplaylist.deleteSuccess"));
    } catch (error) {
      setMessage(t("addplaylist.deleteError"));
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          {t("addplaylist.title")}
        </h1>
        <div className="mb-6 max-w-lg mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder={t("addplaylist.search_placeholder")}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 text-left">{t("addplaylist.tableTitle")}</th>
                <th className="px-4 py-2 text-left">{t("addplaylist.tableUser")}</th>
                <th className="px-4 py-2 text-left">{t("addplaylist.tableEmail")}</th>
                <th className="px-4 py-2 text-left">{t("addplaylist.actions")}</th> 
              </tr>
            </thead>
            <tbody>
              {filteredPlaylists.map((playlist) => (
                <tr key={playlist.id} className="border-b hover:bg-blue-50">
                  <td className="px-4 py-2">{playlist.title}</td>
                  <td className="px-4 py-2">{playlist.user.username}</td>
                  <td className="px-4 py-2">{playlist.user.email}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeletePlaylist(playlist.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      {t("addplaylist.delete")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <form onSubmit={handleAddPlaylist}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                {t("addplaylist.playlistTitle")}
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  titleError ? "border-red-500" : "focus:ring-blue-500"
                }`}
              />
              {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                {t("addplaylist.playlistDescription")}
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  descriptionError ? "border-red-500" : "focus:ring-blue-500"
                }`}
              />
              {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="userId" className="block text-gray-700 font-medium mb-2">
                {t("addplaylist.userId")}
              </label>
              <input
                type="number"
                id="userId"
                value={userId || ""}
                onChange={(e) => setUserId(Number(e.target.value))}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  userIdError ? "border-red-500" : "focus:ring-blue-500"
                }`}
              />
              {userIdError && <p className="text-red-500 text-sm">{userIdError}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300"
            >
              {t("addplaylist.addButton")}
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-blue-600 font-medium">{message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common", "addplaylist"])),
    },
  };
};

export default AddPlaylistPage;
