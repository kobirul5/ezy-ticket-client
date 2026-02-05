import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import noImage from "../../../../assets/Common_image/noImage.png"


const ManageEntertainment = () => {
    const axiosSecure = useAxiosSecure();
    const [viewMovie, setViewMovie] = useState<any>(null);

    const { data: allMovies = [], refetch, isLoading, isError } = useQuery<any[]>({
        queryKey: ['movie'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allmovies');
            return res.data;
        }
    });

    const handleVerifyClick = (movie: any) => {
        setViewMovie(movie);
        (document.getElementById('my_modal_4') as HTMLDialogElement).showModal();
    };
    const handleCloseModal = () => {
        (document.getElementById('my_modal_4') as HTMLDialogElement)?.close();
        setViewMovie(null);
    };
    const handleApprove = (id: string) => {
        axiosSecure.patch(`/verifyMovie/${id}`, { status: 'verified' })
            .then(res => {
                const data = res.data;
                refetch();
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Congratulation! The Movie has been verified',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

        handleCloseModal();
    };

    // Delete Movie
    // const handleDelete = (id: string) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axiosSecure.delete(`/movie/${id}`)
    //                 .then(res => {
    //                     if (res.data.deletedCount > 0) {
    //                         refetch();
    //                         Swal.fire({
    //                             title: "Deleted!",
    //                             text: "Your movie has been deleted.",
    //                             icon: "success"
    //                         });
    //                     }
    //                 })
    //         }
    //     });
    // };

    const handleReject = (id: string) => {
        axiosSecure.patch(`/verifyMovie/${id}`, { status: 'rejected' })
            .then(res => {
                const data = res.data;
                refetch();
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Sorry! The Movie has been rejected',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

        handleCloseModal();
    };
    if (isLoading) return <div className="text-center my-8">Loading movies...</div>;
    if (isError) return <div className="text-center my-8 text-red-500">Error loading movies</div>;

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-semibold text-center my-8">Manage Movies</h2>

            <div className="bg-background rounded-lg shadow-md p-4">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-4 px-4">Photo</th>
                                <th className="text-left py-4 px-4">Title</th>
                                <th className="text-left py-4 px-4">Category</th>
                                <th className="text-left py-4 px-4">Release Date</th>
                                <th className="text-left py-4 px-4">Cinema Halls</th>
                                <th className="text-right py-4 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allMovies.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center">No movies found.</td>
                                </tr>
                            ) : (
                                allMovies.map((movie: any) => (
                                    <tr key={movie._id} className="hover:bg-gray-50">
                                        <td className="p-2">
                                            <img src={movie?.imageLink ? movie.imageLink : noImage} alt={movie.title} className="w-20 h-24 rounded" />
                                        </td>
                                        <td className="p-2">{movie.name}</td>
                                        <td className="p-2">{movie.category}</td>
                                        <td className="p-2">
                                            {new Date(movie.releaseDate).toLocaleDateString()}
                                            <br />
                                            <span className="text-sm text-gray-500">{movie.movieTime}</span>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex flex-col">
                                                {movie.cinemaHalls?.join(", ")}
                                            </div>
                                        </td>
                                        <td className="p-2 flex justify-end">
                                            {movie?.status === "rejected" ? (
                                                <p className="py-1 px-3 bg-red-100 text-red-600 border border-red-300 w-fit rounded">
                                                    Rejected
                                                </p>
                                            ) : movie?.status === "verified" ? (
                                                <p className="py-1 px-3 bg-green-100 text-green-600 border border-green-300 w-fit rounded">
                                                    Verified
                                                </p>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-outline btn-primary"
                                                    onClick={() => handleVerifyClick(movie)}
                                                >
                                                    Verify
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {/* <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg text-center">{viewMovie?.title} Details</h3>
                    <div className="py-4">
                       
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={() => setViewMovie(null)}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog> */}

            {/* View Modal */}
             <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    {viewMovie && (
                        <div className="card lg:card-side bg-base-100 shadow-xl">
                            <figure><img src={viewMovie.imageLink} alt="Movie" className="h-[400px] w-full object-cover" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-3xl">{viewMovie.name}</h2>
                                <div className="grid grid-cols-2 gap-4 my-4">
                                    <p><span className="font-bold">Category:</span> {viewMovie.category}</p>
                                    <p><span className="font-bold">Genre:</span> {viewMovie.genre}</p>
                                    <p><span className="font-bold">Language:</span> {viewMovie.language}</p>
                                    <p><span className="font-bold">Duration:</span> {viewMovie.duration}</p>
                                    <p><span className="font-bold">Release Date:</span> {viewMovie.releaseDate}</p>
                                    <p><span className="font-bold">Director:</span> {viewMovie.director}</p>
                                </div>
                                <div className="space-y-2">
                                    <p><span className="font-bold">Description:</span> {viewMovie.description}</p>
                                    <p><span className="font-bold">Actors:</span> {viewMovie.actors}</p>
                                    <p><span className="font-bold">Cinema Halls:</span> {viewMovie.cinemaHalls?.join(', ')}</p>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <button className="ezy-button-primary-sm" onClick={() => handleApprove(viewMovie._id)}>
                                        Approve
                                    </button>
                                    <button className="ezy-button-secondary-sm" onClick={() => handleReject(viewMovie._id)}>
                                        Reject
                                    </button>
                                     <form method="dialog">
                                        <button className="btn" onClick={handleCloseModal}>Close</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default ManageEntertainment;