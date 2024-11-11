-- CreateTable
CREATE TABLE "_PlaylistSongs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistSongs_AB_unique" ON "_PlaylistSongs"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistSongs_B_index" ON "_PlaylistSongs"("B");

-- AddForeignKey
ALTER TABLE "_PlaylistSongs" ADD CONSTRAINT "_PlaylistSongs_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistSongs" ADD CONSTRAINT "_PlaylistSongs_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
