<?php
/**
 * Template Name: Homepage
 */
get_header();
?>

<main>

</main>
<section>
<?php get_template_part( 'loops/loop', 'blog-' . siteorigin_setting( 'blog_archive_layout' ) ); ?>
</section>
<section class="newsletter">
<h3> Sign up for newsletter </h3>
</section>


<?php
get_footer()
?>