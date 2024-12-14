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

  const [newPlaylistTitle, setNewPlaylistTitle] = useState<string>("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState<string>("");
  const [newPlaylistUsername, setNewPlaylistUsername] = useState<string>("");
  const [newPlaylistEmail, setNewPlaylistEmail] = useState<string>("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await PlaylistService.getAllPlaylists();
      const playlistData = await response.json();
      setPlaylists(playlistData);
      setFilteredPlaylists(playlistData);
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

  const handleAddPlaylist = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newPlaylistTitle || !newPlaylistDescription || !newPlaylistUsername || !newPlaylistEmail) {
      alert(t("addplaylist.errorFillFields"));
      return;
    }

    const newPlaylist = {
      title: newPlaylistTitle,
      description: newPlaylistDescription,
      user: {
        username: newPlaylistUsername,
        email: newPlaylistEmail,
        password: "defaultPassword",
      },
    };

    try {
      const response = await PlaylistService.addPlaylist(newPlaylist);

      if (!response.ok) {
        throw new Error(`Failed to add playlist: ${response.statusText}`);
      }

      setNewPlaylistTitle("");
      setNewPlaylistDescription("");
      setNewPlaylistUsername("");
      setNewPlaylistEmail("");

      const updatedPlaylistsResponse = await PlaylistService.getAllPlaylists();
      const updatedPlaylists = await updatedPlaylistsResponse.json();

      setPlaylists(updatedPlaylists);
      setFilteredPlaylists(updatedPlaylists);

      alert(t("addplaylist.success"));
    } catch (error) {
      console.error("Failed to add playlist", error);
      alert(t("addplaylist.error"));
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
              </tr>
            </thead>
            <tbody>
              {filteredPlaylists.map((playlist) => (
                <tr key={playlist.id} className="border-b hover:bg-blue-50">
                  <td className="px-4 py-2">{playlist.title}</td>
                  <td className="px-4 py-2">{playlist.user.username}</td>
                  <td className="px-4 py-2">{playlist.user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            {t("addplaylist.createTitle")}
          </h2>
          <form onSubmit={handleAddPlaylist}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                {t("addplaylist.playlistTitle")}
              </label>
              <input
                type="text"
                id="title"
                value={newPlaylistTitle}
                onChange={(e) => setNewPlaylistTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                {t("addplaylist.playlistDescription")}
              </label>
              <textarea
                id="description"
                value={newPlaylistDescription}
                onChange={(e) => setNewPlaylistDescription(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                {t("addplaylist.username")}
              </label>
              <input
                type="text"
                id="username"
                value={newPlaylistUsername}
                onChange={(e) => setNewPlaylistUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                {t("addplaylist.email")}
              </label>
              <input
                type="email"
                id="email"
                value={newPlaylistEmail}
                onChange={(e) => setNewPlaylistEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300"
            >
              {t("addplaylist.addButton")}
            </button>
          </form>
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
