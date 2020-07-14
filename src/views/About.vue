<template>
    <div class="about">
        <b-nav tabs>
            <b-nav-item disabled>
                <router-link to="/">Reviews</router-link>
            </b-nav-item>
            <b-nav-item disabled>
                <router-link to="/search">Search</router-link>
            </b-nav-item>
            <b-nav-item disabled>
                <router-link to="/score">Score</router-link>
            </b-nav-item>
            <b-nav-item active>
                <router-link to="/about">About</router-link>
            </b-nav-item>
            <b-nav-item>
                <router-link to="/login">Login</router-link>
            </b-nav-item>
        </b-nav>
        <b-jumbotron header="DaWeSearch" lead="A tool accelerating your systematic literature review" >
            <b-button variant="primary" href="/login">Get started!</b-button>
        </b-jumbotron>
        <b-carousel
                id="carousel-1"
                v-model="slide"
                :interval="8000"
                controls
                indicators
                background="black"
                img-width="1024"
                img-height="480"
                style="text-shadow: 1px 1px 2px #333;"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
        >
            <!-- Text slides with image -->
            <b-carousel-slide
                    caption="What is systematic literature review?"
                    text="A short explanation in German"
                    img-src="https://images.pexels.com/photos/1005324/literature-book-open-pages-1005324.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            >
                <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="https://www.youtube-nocookie.com/embed/2NmDlsy_Igw"
                        allowfullscreen
                ></b-embed>
            </b-carousel-slide>

            <b-carousel-slide
                    caption="You want to know more about systematic literature review?"
                    text="Watch this longer video in English and get lit"
                    img-src="https://images.pexels.com/photos/1333742/pexels-photo-1333742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            >
                <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="https://www.youtube-nocookie.com/embed/9la5ytz9MmM"
                        allowfullscreen
                ></b-embed>
            </b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide
                    caption="How to use our tool"
                    text="Demo video is coming soon"
                    img-src="https://images.pexels.com/photos/2946979/pexels-photo-2946979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
                <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="https://www.youtube-nocookie.com/embed/x92g01IsymM"
                        allowfullscreen
                ></b-embed>
            </b-carousel-slide>
        </b-carousel>

    </div>
</template>

